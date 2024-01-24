const User = ({ user }) => {
  console.log('user', user)
  const name = user.name
  const blogs = user.blogs

  return (
    <div>
      <table id="user">
        <thead>
          <tr><td>{name}</td><td>{blogs.length}</td></tr>
        </thead>
    </table>
    </div>
  )
}

export default User
