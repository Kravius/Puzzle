export function startGameBtn(parent: HTMLElement | null, deleteElement: HTMLElement | null) {
  if (parent && deleteElement) {
    parent.removeChild(deleteElement);
  }
}
