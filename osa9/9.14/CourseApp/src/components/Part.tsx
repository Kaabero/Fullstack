import { CoursePart } from "../../types"

interface part {
    part: CoursePart
}
const Part = ({part}: part) => {
    
    switch (part.kind) {
        case "basic":
            console.log('basic', part)
            return (
                <div>
                    <br />
                    <strong>{part.name} {part.exerciseCount}</strong> <br />
                    <em>{part.description}</em>
                </div>
            )
        case "group":
            console.log('group', part)
            return (
                <div>
                    <br />
                    <strong>{part.name} {part.exerciseCount}</strong>  <br />
                    project exercises: {part.groupProjectCount}
                </div>
            )
        case "background":
            console.log('backround', part)
            return (
                <div>
                    <br />
                    <strong>{part.name} {part.exerciseCount}</strong> <br />
                    <em>{part.description}</em><br />
                    submit to: {part.backgroundMaterial}
                </div>
            )
        case "special":
            console.log('special', part)
            return (
                <div>
                    <br />
                    <strong>{part.name} {part.exerciseCount}</strong> <br />
                    <em>{part.description}</em><br />
                    required skils: {part.requirements.join(', ')}
                </div>
            )


    }
   
};

export default Part