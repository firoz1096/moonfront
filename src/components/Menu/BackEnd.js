import React from 'react'
import { Link } from "react-router-dom";

export default function BackEnd() {
  return (
<ul>
<li><Link to="node-js">Node.js</Link></li>
<li><Link to="/type-script">TypeScript</Link></li>
<li><Link to="/mongo-db">MongoDB</Link></li>
<li><Link to="/firebase">Firebase</Link></li>
<li><Link to="/asp">ASP.NET</Link></li>
<li><Link to="/csharp">C#</Link></li>
<li><Link to="/sql-server">SQL Server</Link></li>
</ul>
  )
}









