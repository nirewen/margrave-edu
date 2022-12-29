/** Dispatch event on click outside of node */
export function clickOutside(node: HTMLElement, callback: Function) {
    const handleClick = (event: MouseEvent) => {
        if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
            callback()
        }
    }

    document.addEventListener('click', handleClick, true)

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true)
        },
    }
}
