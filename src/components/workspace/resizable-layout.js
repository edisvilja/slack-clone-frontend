import { useState, useRef, useEffect } from 'react'

// ResizableLayout Komponente
const ResizableLayout = ({ sidebar, content }) => {
  const [sidebarWidth, setSidebarWidth] = useState(250) // Anfangsbreite der Sidebar
  const containerRef = useRef(null)
  const resizerRef = useRef(null)

  const MIN_SIDEBAR_WIDTH = 150 // Minimale Breite der Sidebar
  const MIN_CONTENT_WIDTH = 150 // Minimale Breite des Contents

  const handleMouseDown = e => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = e => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.getBoundingClientRect().width
      const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left

      // Berechnung der maximalen Breite der Sidebar
      const maxSidebarWidth = containerWidth - MIN_CONTENT_WIDTH

      // Überprüfung, ob die neue Breite innerhalb der Grenzen liegt
      if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= maxSidebarWidth) {
        setSidebarWidth(newWidth)
      }
    }
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    if (resizerRef.current) {
      resizerRef.current.addEventListener('mousedown', handleMouseDown)
    }
    return () => {
      if (resizerRef.current) {
        resizerRef.current.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [])

  useEffect(() => {
    // Aktualisierung der Sidebar-Breite bei Größenänderungen
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width
        const maxSidebarWidth = containerWidth - MIN_CONTENT_WIDTH
        if (sidebarWidth > maxSidebarWidth) {
          setSidebarWidth(maxSidebarWidth)
        }
      }
    }

    // ResizeObserver hinzufügen, um auf Größenänderungen zu reagieren
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.current)

    // Event-Listener für Fenstergrößenänderungen
    window.addEventListener('resize', handleResize)

    // Aufräumen
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [sidebarWidth])

  return (
    <div
      ref={containerRef}
      className="resizable-panel | flex h-full | bg-gray-100 rounded-lg shadow-md border-4 dark:border-gray-800"
    >
      <div className="sidebar | p-4 dark:bg-gray-900 rounded-l-lg shadow-md" style={{ width: `${sidebarWidth}px` }}>
        {sidebar}
      </div>
      <div ref={resizerRef} className="resizer | w-1 h-full | dark:bg-gray-800 cursor-col-resize" />
      <div className="content | flex-1 p-4 dark:bg-gray-900 rounded-r-lg shadow-md">{content}</div>
    </div>
  )
}

export default ResizableLayout
