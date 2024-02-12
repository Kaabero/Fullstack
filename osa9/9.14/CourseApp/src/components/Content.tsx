interface ContentProps {

    courseParts: ContentParts[]
};

interface ContentParts {

    name: string;
    exerciseCount: number;
};

const Content = (props: ContentProps) => {
    return (
        props.courseParts.map((part)=>
        <p key={part.name}> {part.name} {part.exerciseCount} </p>
        )
    )
};

export default Content