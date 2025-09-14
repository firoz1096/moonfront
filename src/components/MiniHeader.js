
import { Link } from "react-router-dom";

export default function MiniHeader() {
  return (
    
<div className='mini_header'> 
<div className='container'>

<div className='row align-items-center'>


        <div className='col-12 d-lg-block d-none'>
        <Link to="/photoshop/home">Photoshop</Link>
        <Link to="/html/home">HTML</Link>
        <Link to="/css/home">CSS</Link>
        <Link to="/bootstrap/home">Bootstrap</Link>
        <Link to="/sass/home">Sass</Link>
        <Link to="/javascript/home">JavaScript</Link>
        <Link to="/jquery/home">jQuery</Link>
        <Link to="/react/home">React</Link>
        <Link to="/node/home">Node.js</Link>
        <Link to="/typescript/home">TypeScript</Link>
        <Link to="/mongodb/home">MongoDB</Link>
        <Link to="/firebase/home">Firebase</Link>
        <Link to="/aspdotnet/home">ASP.NET</Link>
        <Link to="/csharp/home">C#</Link>
        <Link to="/sql-server/home">SQL Server</Link>


        </div>

</div>

</div>

</div>
  )
}
