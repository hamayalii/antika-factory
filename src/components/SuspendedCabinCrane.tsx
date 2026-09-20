import * as React from "react"

type ImageControlValue =
    | string
    | { src?: string; srcSet?: string; alt?: string }
    | undefined

interface SuspendedCabinCraneProps {
    craneImage?: ImageControlValue
    cabinImage?: ImageControlValue
    swingAmplitude?: number
    swingSpeed?: number
    damping?: number
    dragRange?: number
    cableColor?: string
    cableWidth?: number
    cabinScale?: number
    whiteThreshold?: number
    showDebug?: boolean
    style?: React.CSSProperties
}

type ProcessedImage = {
    src: string
    width: number
    height: number
}

const DEFAULT_CRANE_URL = "/images/crane.png"
const DEFAULT_CABIN_URL = "/images/cabin.png"

const processedCache = new Map<string, Promise<ProcessedImage>>()

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
}

function resolveImage(
    input: ImageControlValue,
    fallbackUrl: string,
    fallbackAlt: string
) {
    if (typeof input === "string") {
        return { src: input || fallbackUrl, alt: fallbackAlt }
    }
    if (input && typeof input === "object") {
        return {
            src: input.src || fallbackUrl,
            alt: input.alt || fallbackAlt,
            srcSet: input.srcSet,
        }
    }
    return { src: fallbackUrl, alt: fallbackAlt }
}

async function loadImage(url: string): Promise<HTMLImageElement> {
    return await new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = "anonymous"
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error(`Failed image load: ${url}`))
        image.src = url
    })
}

async function removeEdgeConnectedWhite(
    url: string,
    threshold: number
): Promise<ProcessedImage> {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return { src: url, width: 1, height: 1 }
    }

    const safeThreshold = clamp(Math.round(threshold), 0, 120)
    const key = `${url}::${safeThreshold}`
    const cached = processedCache.get(key)
    if (cached) return await cached

    const task = (async () => {
        try {
            const image = await loadImage(url)
            const canvas = document.createElement("canvas")
            canvas.width = image.naturalWidth || image.width || 1
            canvas.height = image.naturalHeight || image.height || 1

            const ctx = canvas.getContext("2d", { willReadFrequently: true })
            if (!ctx)
                return { src: url, width: canvas.width, height: canvas.height }

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            )
            const data = imageData.data
            const width = imageData.width
            const height = imageData.height
            const count = width * height
            const visited = new Uint8Array(count)
            const removed = new Uint8Array(count)
            const queue = new Int32Array(count)
            let head = 0
            let tail = 0

            const isBackgroundWhite = (index: number) => {
                const i = index * 4
                const r = data[i]
                const g = data[i + 1]
                const b = data[i + 2]
                const a = data[i + 3]
                if (a <= 6) return true
                const minChannel = Math.min(r, g, b)
                const maxChannel = Math.max(r, g, b)
                const whiteness = 255 - minChannel
                const chroma = maxChannel - minChannel
                return (
                    whiteness <= safeThreshold && chroma <= safeThreshold * 1.25
                )
            }

            const push = (idx: number) => {
                if (visited[idx]) return
                visited[idx] = 1
                queue[tail++] = idx
            }

            for (let x = 0; x < width; x++) {
                push(x)
                push((height - 1) * width + x)
            }
            for (let y = 1; y < height - 1; y++) {
                push(y * width)
                push(y * width + (width - 1))
            }

            while (head < tail) {
                const idx = queue[head++]
                if (!isBackgroundWhite(idx)) continue
                removed[idx] = 1

                const x = idx % width
                const y = Math.floor(idx / width)
                if (x > 0) push(idx - 1)
                if (x < width - 1) push(idx + 1)
                if (y > 0) push(idx - width)
                if (y < height - 1) push(idx + width)
            }

            for (let p = 0; p < count; p++) {
                if (removed[p]) data[p * 4 + 3] = 0
            }

            // Defringe edges
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const idx = y * width + x
                    if (removed[idx]) continue
                    const i = idx * 4
                    const alpha = data[i + 3]
                    if (alpha === 0) continue
                    const minChannel = Math.min(
                        data[i],
                        data[i + 1],
                        data[i + 2]
                    )
                    const whiteness = 255 - minChannel
                    if (whiteness > safeThreshold * 1.2) continue

                    const neighbors = [
                        idx - 1,
                        idx + 1,
                        idx - width,
                        idx + width,
                        idx - width - 1,
                        idx - width + 1,
                        idx + width - 1,
                        idx + width + 1,
                    ]
                    let edgeCount = 0
                    for (let n = 0; n < neighbors.length; n++) {
                        if (removed[neighbors[n]]) edgeCount++
                    }
                    if (edgeCount === 0) continue

                    const soften = clamp(
                        (safeThreshold * 1.15 - whiteness) /
                            (safeThreshold * 1.15),
                        0,
                        1
                    )
                    const edgeFactor = edgeCount / 8
                    const nextAlpha = Math.round(
                        alpha * (1 - 0.78 * soften * edgeFactor)
                    )
                    data[i + 3] = clamp(nextAlpha, 0, 255)
                }
            }

            ctx.putImageData(imageData, 0, 0)
            return { src: canvas.toDataURL("image/png"), width, height }
        } catch (error) {
            return { src: url, width: 1, height: 1 }
        }
    })()

    processedCache.set(key, task)
    return await task
}

// Anchor points in image local coordinates (normalized 0-1)
const ANCHORS = {
    TROLLEY_POINT: { x: 0.79, y: 0.52 }, // Point on jib where rope leaves
    HOOK_POINT: { x: 0.79, y: 0.70 }, // Hook bottom (below trolley)
    CABIN_LEFT_ANCHOR: { x: 0.19, y: 0.10 }, // Left lifting point on cabin roof
    CABIN_RIGHT_ANCHOR: { x: 0.88, y: 0.20 }, // Right lifting point on cabin roof
}

// Tower fade constants (percentages of crane image height)
const TOWER_FADE = {
    START: 60, // Fade starts at 60% down the tower
    END: 100, // Fade reaches 0% opacity at 100% (bottom edge)
}

export default function SuspendedCabinCrane(props: SuspendedCabinCraneProps) {
    const {
        craneImage,
        cabinImage,
        swingAmplitude = 20,
        swingSpeed = 0.1,
        damping = 3.6,
        dragRange = 145,
        cableColor = "#333333",
        cableWidth = 2,
        cabinScale = 1,
        whiteThreshold = 35,
        showDebug = false,
        style,
    } = props

    const craneResolved = resolveImage(craneImage, DEFAULT_CRANE_URL, "قەرەغەل")
    const cabinResolved = resolveImage(cabinImage, DEFAULT_CABIN_URL, "کەبین")

    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const cabinHitRef = React.useRef<HTMLDivElement | null>(null)

    const [bounds, setBounds] = React.useState({ width: 900, height: 700 })
    const [processedCraneSrc, setProcessedCraneSrc] = React.useState<string>(
        craneResolved.src
    )
    const [processedCabinSrc, setProcessedCabinSrc] = React.useState<string>(
        cabinResolved.src
    )

    const [renderX, setRenderX] = React.useState(0)
    const [isDragging, setIsDragging] = React.useState(false)
    const [tiltDeg, setTiltDeg] = React.useState(0)
    const [rafHeartbeat, setRafHeartbeat] = React.useState(0)
    const [monitorNow, setMonitorNow] = React.useState(0)

    const currentXRef = React.useRef(0)
    const velocityXRef = React.useRef(0)
    const draggingRef = React.useRef(false)
    const lastPointerXRef = React.useRef(0)
    const lastPointerTimeRef = React.useRef(0)
    const elapsedRef = React.useRef(0)
    const lastFrameTimeRef = React.useRef(0)
    const frameCountRef = React.useRef(0)
    const reducedMotionRef = React.useRef(false)
    const activePointerIdRef = React.useRef<number | null>(null)
    const velocityFilterAlphaRef = React.useRef(0.22)

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            reducedMotionRef.current = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        }
    }, [])

    React.useEffect(() => {
        if (typeof window === "undefined") return
        const node = rootRef.current
        if (!node) return

        const update = () => {
            setBounds({
                width: node.clientWidth || 900,
                height: node.clientHeight || 700,
            })
        }
        update()
        const observer = new ResizeObserver(update)
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    React.useEffect(() => {
        let mounted = true
        // Apply aggressive white removal for cleaner edges
        removeEdgeConnectedWhite(craneResolved.src, whiteThreshold).then(
            (result) => {
                if (!mounted) return
                setProcessedCraneSrc(result.src)
            }
        )
        removeEdgeConnectedWhite(cabinResolved.src, whiteThreshold).then(
            (result) => {
                if (!mounted) return
                setProcessedCabinSrc(result.src)
            }
        )
        return () => {
            mounted = false
        }
    }, [craneResolved.src, cabinResolved.src, whiteThreshold])

    React.useEffect(() => {
        if (typeof window === "undefined") return

        let rafId = 0
        lastFrameTimeRef.current = 0

        const tick = (timestamp: number) => {
            const last = lastFrameTimeRef.current || timestamp
            const dt = clamp((timestamp - last) / 1000, 1 / 240, 0.05)
            lastFrameTimeRef.current = timestamp
            elapsedRef.current += dt

            if (!draggingRef.current) {
                const reduced = reducedMotionRef.current
                const amp = reduced ? swingAmplitude * 0.3 : swingAmplitude
                const targetX =
                    amp *
                    Math.sin(elapsedRef.current * swingSpeed * Math.PI * 2)

                const springK = 3.1
                const damper = clamp(damping, 1.2, 12)
                const displacement = currentXRef.current - targetX
                const acceleration =
                    -springK * displacement - damper * velocityXRef.current
                velocityXRef.current += acceleration * dt
                currentXRef.current += velocityXRef.current * dt
                currentXRef.current = clamp(
                    currentXRef.current,
                    -dragRange,
                    dragRange
                )
            } else {
                currentXRef.current = clamp(
                    currentXRef.current,
                    -dragRange,
                    dragRange
                )
            }

            const tilt = clamp(
                (currentXRef.current / Math.max(dragRange, 1)) * 6.5 +
                    velocityXRef.current * 0.012,
                -9,
                9
            )

            frameCountRef.current += 1
            setRenderX(currentXRef.current)
            setTiltDeg(tilt)
            if (frameCountRef.current % 4 === 0) setRafHeartbeat(timestamp)

            rafId = window.requestAnimationFrame(tick)
        }

        rafId = window.requestAnimationFrame(tick)
        return () => {
            window.cancelAnimationFrame(rafId)
        }
    }, [swingAmplitude, swingSpeed, damping, dragRange])

    React.useEffect(() => {
        if (typeof window === "undefined") return
        const intervalId = window.setInterval(() => {
            setMonitorNow(performance.now())
        }, 250)
        return () => {
            window.clearInterval(intervalId)
        }
    }, [])

    const stopDragging = React.useCallback(
        (pointerId?: number, releaseCapture?: boolean) => {
            draggingRef.current = false
            setIsDragging(false)

            const hit = cabinHitRef.current
            if (
                releaseCapture &&
                hit &&
                pointerId !== undefined &&
                hit.hasPointerCapture(pointerId)
            ) {
                hit.releasePointerCapture(pointerId)
            }
            activePointerIdRef.current = null
            currentXRef.current = clamp(
                currentXRef.current,
                -dragRange,
                dragRange
            )
            velocityXRef.current = clamp(velocityXRef.current, -420, 420)
        },
        [dragRange]
    )

    React.useEffect(() => {
        if (typeof window === "undefined") return

        const onWindowPointerUp = () => stopDragging(undefined, false)
        const onWindowPointerCancel = () => stopDragging(undefined, false)
        window.addEventListener("pointerup", onWindowPointerUp)
        window.addEventListener("pointercancel", onWindowPointerCancel)
        return () => {
            window.removeEventListener("pointerup", onWindowPointerUp)
            window.removeEventListener("pointercancel", onWindowPointerCancel)
        }
    }, [stopDragging])

    const onCabinPointerDown = React.useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            event.preventDefault()
            event.stopPropagation()
            const target = event.currentTarget
            target.setPointerCapture(event.pointerId)
            activePointerIdRef.current = event.pointerId
            draggingRef.current = true
            setIsDragging(true)
            lastPointerXRef.current = event.clientX
            lastPointerTimeRef.current = event.timeStamp || performance.now()
            velocityXRef.current = clamp(velocityXRef.current, -420, 420)
        },
        []
    )

    const onCabinPointerMove = React.useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            if (!draggingRef.current) return
            if (
                activePointerIdRef.current !== null &&
                event.pointerId !== activePointerIdRef.current
            )
                return

            event.preventDefault()
            event.stopPropagation()

            const now = event.timeStamp || performance.now()
            const deltaX = event.clientX - lastPointerXRef.current
            const dt = clamp(
                (now - lastPointerTimeRef.current) / 1000,
                1 / 240,
                0.06
            )
            const effectiveDeltaX = Math.abs(deltaX) < 0.2 ? 0 : deltaX

            const nextX = clamp(
                currentXRef.current + effectiveDeltaX,
                -dragRange,
                dragRange
            )
            const measuredVelocity = (nextX - currentXRef.current) / dt
            const alpha = velocityFilterAlphaRef.current
            const smoothedVelocity =
                velocityXRef.current * (1 - alpha) +
                clamp(measuredVelocity, -1200, 1200) * alpha

            currentXRef.current = nextX
            velocityXRef.current = clamp(smoothedVelocity, -420, 420)
            lastPointerXRef.current = event.clientX
            lastPointerTimeRef.current = now

            const tilt = clamp(
                (currentXRef.current / Math.max(dragRange, 1)) * 6.5 +
                    velocityXRef.current * 0.01,
                -9,
                9
            )

            setRenderX(currentXRef.current)
            setTiltDeg(tilt)
        },
        [dragRange]
    )

    const onCabinPointerUp = React.useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            event.preventDefault()
            event.stopPropagation()
            stopDragging(event.pointerId, true)
        },
        [stopDragging]
    )

    const onCabinLostCapture = React.useCallback(() => {
        stopDragging(undefined, false)
    }, [stopDragging])

    const scene = React.useMemo(() => {
        const w = bounds.width || 900
        const h = bounds.height || 700
        const craneX = w * 0.02
        const craneY = h * 0.05
        const craneW = w * 0.88
        const craneH = h * 0.76
        const trolleyX = craneX + craneW * ANCHORS.TROLLEY_POINT.x
        const trolleyY = craneY + craneH * ANCHORS.TROLLEY_POINT.y
        const hookX = craneX + craneW * ANCHORS.HOOK_POINT.x
        const hookY = craneY + craneH * ANCHORS.HOOK_POINT.y

        const safeScale = clamp(cabinScale, 0.55, 1.6)
        const cabinW = w * 0.45 * safeScale
        const cabinH = cabinW * 0.45
        const cabinBaseX = hookX
        const cabinY = hookY + h * 0.15

        return {
            w,
            h,
            craneX,
            craneY,
            craneW,
            craneH,
            trolleyX,
            trolleyY,
            hookX,
            hookY,
            cabinW,
            cabinH,
            cabinBaseX,
            cabinY,
        }
    }, [bounds, cabinScale])

    const cabinCenterX = scene.cabinBaseX + renderX
    const angle = (tiltDeg * Math.PI) / 180
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    // Calculate cabin anchor points in world coordinates
    const cabinLeftAnchor = {
        x: cabinCenterX + (ANCHORS.CABIN_LEFT_ANCHOR.x - 0.5) * scene.cabinW * cos - (ANCHORS.CABIN_LEFT_ANCHOR.y - 0.5) * scene.cabinH * sin,
        y: scene.cabinY + (ANCHORS.CABIN_LEFT_ANCHOR.x - 0.5) * scene.cabinW * sin + (ANCHORS.CABIN_LEFT_ANCHOR.y - 0.5) * scene.cabinH * cos,
    }
    const cabinRightAnchor = {
        x: cabinCenterX + (ANCHORS.CABIN_RIGHT_ANCHOR.x - 0.5) * scene.cabinW * cos - (ANCHORS.CABIN_RIGHT_ANCHOR.y - 0.5) * scene.cabinH * sin,
        y: scene.cabinY + (ANCHORS.CABIN_RIGHT_ANCHOR.x - 0.5) * scene.cabinW * sin + (ANCHORS.CABIN_RIGHT_ANCHOR.y - 0.5) * scene.cabinH * cos,
    }

    const animationRunning = monitorNow - rafHeartbeat < 450

    return (
        <div
            ref={rootRef}
            role="img"
            aria-label="قەرەغەلی کەبینی هەڵدەکێشێت"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "visible",
                background: "transparent",
                touchAction: "pan-y",
                pointerEvents: "none",
                ...style,
            }}
        >
            {/* Static crane - completely separate from animation */}
            <img
                src={processedCraneSrc}
                srcSet={craneResolved.srcSet}
                alt={craneResolved.alt}
                draggable={false}
                style={{
                    position: "absolute",
                    left: scene.craneX,
                    top: scene.craneY,
                    width: scene.craneW,
                    height: scene.craneH,
                    objectFit: "contain",
                    pointerEvents: "none",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    zIndex: 1,
                    clipPath: "inset(0 0 1% 0)",
                    maskImage: `linear-gradient(to bottom, black ${TOWER_FADE.START}%, rgba(0,0,0,0.8) ${TOWER_FADE.START + 10}%, rgba(0,0,0,0.4) ${TOWER_FADE.START + 25}%, rgba(0,0,0,0.1) ${TOWER_FADE.START + 40}%, transparent ${TOWER_FADE.END}%)`,
                    WebkitMaskImage: `linear-gradient(to bottom, black ${TOWER_FADE.START}%, rgba(0,0,0,0.8) ${TOWER_FADE.START + 10}%, rgba(0,0,0,0.4) ${TOWER_FADE.START + 25}%, rgba(0,0,0,0.1) ${TOWER_FADE.START + 40}%, transparent ${TOWER_FADE.END}%)`,
                }}
            />

            {/* Cables SVG */}
            <svg
                width={scene.w}
                height={scene.h}
                viewBox={`0 0 ${scene.w} ${scene.h}`}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    pointerEvents: "none",
                    overflow: "visible",
                    zIndex: 5,
                }}
                aria-hidden="true"
            >
                {/* Hoist rope from trolley to hook */}
                <line
                    x1={scene.trolleyX}
                    y1={scene.trolleyY}
                    x2={scene.hookX}
                    y2={scene.hookY}
                    stroke={cableColor}
                    strokeWidth={cableWidth}
                    strokeLinecap="round"
                />
                {/* Sling cables from hook to cabin anchors */}
                <line
                    x1={scene.hookX}
                    y1={scene.hookY}
                    x2={cabinLeftAnchor.x}
                    y2={cabinLeftAnchor.y}
                    stroke={cableColor}
                    strokeWidth={cableWidth}
                    strokeLinecap="round"
                />
                <line
                    x1={scene.hookX}
                    y1={scene.hookY}
                    x2={cabinRightAnchor.x}
                    y2={cabinRightAnchor.y}
                    stroke={cableColor}
                    strokeWidth={cableWidth}
                    strokeLinecap="round"
                />
                {/* Small shackle circles at cabin anchors */}
                <circle
                    cx={cabinLeftAnchor.x}
                    cy={cabinLeftAnchor.y}
                    r={cableWidth * 1.5}
                    fill={cableColor}
                />
                <circle
                    cx={cabinRightAnchor.x}
                    cy={cabinRightAnchor.y}
                    r={cableWidth * 1.5}
                    fill={cableColor}
                />
                {/* Hook block circle */}
                <circle
                    cx={scene.hookX}
                    cy={scene.hookY}
                    r={cableWidth * 3}
                    fill={cableColor}
                />
            </svg>

            {/* Debug overlay */}
            {showDebug && (
                <svg
                    width={scene.w}
                    height={scene.h}
                    viewBox={`0 0 ${scene.w} ${scene.h}`}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        pointerEvents: "none",
                        overflow: "visible",
                        zIndex: 20,
                    }}
                >
                    {/* Crane bounding box */}
                    <rect
                        x={scene.craneX}
                        y={scene.craneY}
                        width={scene.craneW}
                        height={scene.craneH}
                        fill="none"
                        stroke="rgba(255,0,0,0.5)"
                        strokeWidth={1}
                    />
                    {/* Trolley point */}
                    <circle
                        cx={scene.trolleyX}
                        cy={scene.trolleyY}
                        r={6}
                        fill="rgba(0,255,0,0.8)"
                    />
                    {/* Hook point */}
                    <circle
                        cx={scene.hookX}
                        cy={scene.hookY}
                        r={6}
                        fill="rgba(0,0,255,0.8)"
                    />
                    {/* Cabin left anchor */}
                    <circle
                        cx={cabinLeftAnchor.x}
                        cy={cabinLeftAnchor.y}
                        r={6}
                        fill="rgba(255,255,0,0.8)"
                    />
                    {/* Cabin right anchor */}
                    <circle
                        cx={cabinRightAnchor.x}
                        cy={cabinRightAnchor.y}
                        r={6}
                        fill="rgba(255,0,255,0.8)"
                    />
                </svg>
            )}

            {/* Draggable cabin */}
            <div
                ref={cabinHitRef}
                onPointerDown={onCabinPointerDown}
                onPointerMove={onCabinPointerMove}
                onPointerUp={onCabinPointerUp}
                onPointerCancel={onCabinPointerUp}
                onLostPointerCapture={onCabinLostCapture}
                aria-label="کەبینی ڕاکێشراو"
                style={{
                    position: "absolute",
                    left: cabinCenterX,
                    top: scene.cabinY,
                    width: scene.cabinW,
                    height: scene.cabinH,
                    transform: `translate(-50%, -50%) rotate(${tiltDeg}deg)`,
                    transformOrigin: "50% 8%",
                    touchAction: "pan-y",
                    pointerEvents: "auto",
                    cursor: isDragging ? "grabbing" : "grab",
                    zIndex: 10,
                    userSelect: "none",
                    WebkitUserSelect: "none",
                }}
            >
                <img
                    src={processedCabinSrc}
                    srcSet={cabinResolved.srcSet}
                    alt={cabinResolved.alt}
                    draggable={false}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        pointerEvents: "none",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                    }}
                />
            </div>

            {showDebug && (
                <div
                    style={{
                        position: "absolute",
                        left: 10,
                        top: 10,
                        zIndex: 25,
                        pointerEvents: "none",
                        background: "rgba(0,0,0,0.62)",
                        color: "#ffffff",
                        borderRadius: 6,
                        padding: "8px 10px",
                        fontSize: 12,
                        lineHeight: "1.35em",
                        fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
                        whiteSpace: "pre-line",
                    }}
                >
                    {`Cabin X: ${Math.round(renderX)}\nDragging: ${isDragging ? "YES" : "NO"}\nAnimation: ${
                        animationRunning ? "RUNNING" : "PAUSED"
                    }`}
                </div>
            )}
        </div>
    )
}
