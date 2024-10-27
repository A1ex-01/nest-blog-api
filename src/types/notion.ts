export interface INotionBlog {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: any;
  icon: any;
  parent: Parent;
  archived: boolean;
  in_trash: boolean;
  properties: Properties;
  url: string;
  public_url: any;
}

export interface CreatedBy {
  object: string;
  id: string;
}

export interface LastEditedBy {
  object: string;
  id: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  标签: GeneratedType;
  创建时间: GeneratedType2;
  更新时间: GeneratedType3;
  名称: GeneratedType4;
}

export interface GeneratedType {
  id: string;
  type: string;
  multi_select: any[];
}

export interface GeneratedType2 {
  id: string;
  type: string;
  created_time: string;
}

export interface GeneratedType3 {
  id: string;
  type: string;
  last_edited_time: string;
}

export interface GeneratedType4 {
  id: string;
  type: string;
  title: Title[];
}

export interface Title {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: any;
}

export interface Text {
  content: string;
  link: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
