import { useLocation, Link } from 'react-router-dom'
export default function Breadcrumbs() {
    const {pathname} = useLocation()
    return (
        <div 
            className="breadcrumbs"
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '1rem'
            
            }}    
        >
            {pathname.split('/').map((str, i, arr) => {
                if(str === "") return <></>;
                let prev = [];
                let position = i;
                if(i > 1) {
                    while(position > 1) {
                        prev.unshift(`${arr[position - 1]}/`)
                        position--
                    }
                }
                return (
                    <>
                        <Link to={`/${prev.join('')}${str}`} key={i}>
                            <button>{str}</button>
                        </Link>
                        <div style={{margin: '0 .5rem 0 .5rem'}}>
                            {arr.length - 1 === i ? "" : ">"}
                        </div>
                    </>
                )
            })}
        </div>
    )
}