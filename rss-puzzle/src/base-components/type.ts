export interface childrenArrayType {
  tag: string;
  className?: string | string[];
  textContent?: string;
  id?: string;
  attributeType?: attributeType;
  onClickFunction?: (ev?: MouseEvent) => void;
}

export interface baseComponentsTypes extends childrenArrayType {
  childrenArray?: childrenArrayType[];
}

interface attributeType {
  type: string;
  text: string;
}
