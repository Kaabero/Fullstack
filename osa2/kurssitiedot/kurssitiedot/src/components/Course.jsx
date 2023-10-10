const Course = ({ course, parts }) =>
  <div>
    <Header course={course} />
    <Content parts={parts} />
    <Sum parts={parts} />
  </div>


const Header = ({ course }) => <h2>{course.name}</h2>

const Sum = ({parts}) => {
  const sum = parts.reduce((prevValue, currentValue) => {
      console.log("Sum", prevValue, currentValue)
      return prevValue + currentValue.exercises
    },
    0
  )
  return <strong>total of {sum} exercises</strong>;
}


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part
      key={part.id}
      part={part} 
    />
    )
  )
}

const Courses = ({ courses }) => { 
    console.log(courses)
    return courses.map((course) => (
      <Course
        key={course.id}
        course={course}
        parts={course.parts}
      />
      )
    )
  }


export default Courses
