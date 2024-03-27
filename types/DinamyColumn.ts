import { DinamyComponent } from "./DinamyComponent"

export interface DinamyColumn{
    size: {
        mobile: String,
        sm?: String, 
        md?: String, 
        lg?: String, 
        xl?: String 
    },
    content: DinamyComponent[]
}