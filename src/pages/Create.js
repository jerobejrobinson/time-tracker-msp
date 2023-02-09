

// Custom Hooks
const Create = () => {

  return (
    <div className="page create">
      <form>
        <div>
          <label htmlFor="getUser">Scan User Id:</label>
          <input type="text" name="getUser" id="getUser"/>
        </div>
        <div>
          <label htmlFor="getTicket">Scan Ticket Number:</label>
          <input type="text" name="getTicket" id="getTicket"/>
        </div>
        <button >Next</button>
      </form>
    </div>
  )
}

export default Create