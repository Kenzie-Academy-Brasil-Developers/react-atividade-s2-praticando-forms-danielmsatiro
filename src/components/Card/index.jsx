export const Card = ( {data} ) => {
    return (
        <div className="card">
          <h1>User: {data.user}</h1>
          <h2>Name: {data.name}</h2>
          <h3>E-mail: {data.email}</h3>

        </div>
    )
}