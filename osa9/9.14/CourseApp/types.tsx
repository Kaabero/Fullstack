export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartDercription extends CoursePartBase {
    description: string;
}  

export interface CoursePartSpecial extends CoursePartDercription {
    requirements: string[];
    kind: "special"
}  
  
export interface CoursePartBasic extends CoursePartDercription {
    kind: "basic"
}
  
export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}
  
export interface CoursePartBackground extends CoursePartDercription {
    backgroundMaterial: string;
    kind: "background"
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
