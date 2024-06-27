import React from 'react';

interface VNode {
  type: string | Function;
  props: { [key: string]: any };
  children: (VNode | string)[];
  key?: string | number;
}

export function optimizedCreateElement(
  type: string | Function,
  props: { [key: string]: any } | null,
  ...children: (VNode | string)[]
): VNode {
  const optimizedProps = props ? Object.keys(props).reduce((acc, key) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as { [key: string]: any }) : {};

  const flattenedChildren = children.reduce((acc, child) => {
    if (Array.isArray(child)) {
      return acc.concat(child);
    }
    return acc.concat([child]);
  }, [] as (VNode | string)[]);

  return {
    type,
    props: optimizedProps,
    children: flattenedChildren,
    key: optimizedProps.key,
  };
}

function isVNode(node: any): node is VNode {
  return typeof node === 'object' && node !== null && 'type' in node;
}

export function patchVDom(oldVNode: VNode | string, newVNode: VNode | string, domNode: Node): Node {
  if (typeof oldVNode === 'string' && typeof newVNode === 'string') {
    if (oldVNode !== newVNode) {
      domNode.textContent = newVNode;
    }
    return domNode;
  }

  if (typeof oldVNode !== typeof newVNode || 
      (isVNode(oldVNode) && isVNode(newVNode) && oldVNode.type !== newVNode.type)) {
    const newDomNode = createDomNode(newVNode);
    domNode.parentNode?.replaceChild(newDomNode, domNode);
    return newDomNode;
  }

  if (isVNode(oldVNode) && isVNode(newVNode)) {
    updateProps(domNode as Element, oldVNode.props, newVNode.props);

    const oldChildren = oldVNode.children;
    const newChildren = newVNode.children;
    const oldChildrenMap = new Map(
      oldChildren.map((child, index) => [isVNode(child) ? child.key ?? index : index, child])
    );

    let lastIndex = 0;
    newChildren.forEach((newChild, newIndex) => {
      const newKey = isVNode(newChild) ? newChild.key ?? newIndex : newIndex;
      const oldChild = oldChildrenMap.get(newKey);

      if (oldChild) {
        patchVDom(oldChild, newChild, domNode.childNodes[newIndex]);
        const oldIndex = oldChildren.indexOf(oldChild);
        if (oldIndex < lastIndex) {
          domNode.insertBefore(domNode.childNodes[newIndex], domNode.childNodes[lastIndex]);
        } else {
          lastIndex = oldIndex;
        }
        oldChildrenMap.delete(newKey);
      } else {
        domNode.insertBefore(createDomNode(newChild), domNode.childNodes[newIndex] || null);
      }
    });

    oldChildrenMap.forEach((child) => {
      domNode.removeChild(domNode.childNodes[oldChildren.indexOf(child)]);
    });
  }

  return domNode;
}

function createDomNode(vnode: VNode | string): Node {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  const element = document.createElement(vnode.type as string);
  updateProps(element, {}, vnode.props);

  for (const child of vnode.children) {
    element.appendChild(createDomNode(child));
  }

  return element;
}

function updateProps(element: Element, oldProps: { [key: string]: any }, newProps: { [key: string]: any }) {
  for (const key in oldProps) {
    if (!(key in newProps)) {
      if (key.startsWith('on')) {
        element.removeEventListener(key.slice(2).toLowerCase(), oldProps[key]);
      } else {
        (element as any)[key] = '';
      }
    }
  }

  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      if (key.startsWith('on')) {
        if (oldProps[key]) {
          element.removeEventListener(key.slice(2).toLowerCase(), oldProps[key]);
        }
        element.addEventListener(key.slice(2).toLowerCase(), newProps[key]);
      } else {
        (element as any)[key] = newProps[key];
      }
    }
  }
}