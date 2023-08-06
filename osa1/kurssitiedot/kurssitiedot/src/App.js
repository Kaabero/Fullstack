const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  // const-määrittelyt

  return (
    <div>
      <Header course={course} />
      <Content name="Fundamentals of React" exercises={10} />
      <Content name="Using props to pass data" exercises={7} />
      <Content name="State of a component" exercises={14} />
      <Total total={10+7+14} />
    </div>
  )
}


export default App

