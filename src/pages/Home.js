import useFetchTasks from "../hooks/useFetchTasks";
import useHtmlLoader from "../hooks/useHtmlLoader";

const Home = () => {
  return (
    <div className="page home">
      <h2>Current Tasks</h2>
      {useHtmlLoader(useFetchTasks, (data) => {
        data.map((item) => (
          <div key={item.key}>
            {item.user_id}
          </div>
        ))
      })}
    </div>
  )
}

export default Home