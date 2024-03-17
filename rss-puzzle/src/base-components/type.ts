export interface childrenArrayType {
  tag: string;
  className?: string | string[];
  textContent?: string;
  id?: string;
  attributeType?: AttributeType | AttributeType[];
  onClickFunction?: (ev?: MouseEvent) => void;
}

export interface baseComponentsTypes extends childrenArrayType {
  childrenArray?: childrenArrayType[];
}

interface AttributeType {
  type: string;
  text: string;
}
