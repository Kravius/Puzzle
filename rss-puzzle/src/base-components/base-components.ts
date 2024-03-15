import { baseComponentsTypes } from './type';

export class BaseComponents {
  constructor() {}
  createBaseComponents(params: baseComponentsTypes): HTMLElement {
    const { tag, textContent, className, childrenArray, id, attributeType, onClickFunction } = params;
    const createElementParents = document.createElement(tag);
    if (onClickFunction) {
      createElementParents.addEventListener('click', onClickFunction);
    }
    if (className) {
      if (Array.isArray(className)) {
        createElementParents.classList.add(...className);
      } else {
        createElementParents.classList.add(className);
      }
    }
    if (textContent) {
      createElementParents.textContent = textContent;
    }
    if (id) {
      createElementParents.id = id;
    }
    if (attributeType) {
      createElementParents.setAttribute(attributeType.text, attributeType.text);
    }
    childrenArray?.forEach((el) => {
      const element = document.createElement(el.tag);
      if (el.className) {
        if (Array.isArray(el.className)) {
          element.classList.add(...el.className);
        } else {
          element.classList.add(el.className);
        }
      }
      if (el.textContent) {
        element.textContent = el.textContent;
      }
      if (el.id) {
        element.id = el.id;
      }
      if (el.attributeType) {
        element.setAttribute(el.attributeType.text, el.attributeType.text);
      }
      createElementParents.append(element);
      return element;
    });
    return createElementParents;
  }
}

// made function to generation tag from class
export const createTag = (props: baseComponentsTypes): HTMLElement => new BaseComponents().createBaseComponents(props);
