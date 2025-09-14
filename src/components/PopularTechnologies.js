
    import React from 'react';
    import { Link } from "react-router-dom";
    import { FaReact } from "react-icons/fa";
    import { FaNodeJs } from "react-icons/fa";
    import { SiMongodb } from "react-icons/si";
    import { SiAdobephotoshop } from "react-icons/si";
    import { FaSass } from "react-icons/fa";
    import { BiLogoJquery } from "react-icons/bi";
    import { FaHtml5 } from "react-icons/fa";
    import { FaCss3Alt } from "react-icons/fa";
    import { IoLogoJavascript } from "react-icons/io5";
    import { SiTypescript } from "react-icons/si";
    import { DiMsqlServer } from "react-icons/di";
    import { BsBootstrap } from "react-icons/bs";

    
    
    export default function PopularTechnologies() {
      return (
        
    
    
    <section className='popular_technologies'> 
    
    <div className='container mt-5 mb-5'>
    
    
    <div className='row'>
        <div className='col-lg-12 text-center'> <h1>Learn to Code</h1></div>
    
        <div className='col-lg-3'>
            <Link to='/react'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><FaReact /></div> 
                    <div> <h2>React</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

        <div className='col-lg-3'>
            <Link to='/node-js'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><FaNodeJs /> </div> 
                    <div> <h2>Node.js</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

        <div className='col-lg-3'>
            <Link to='/mongo-db'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><SiMongodb /></div> 
                    <div> <h2>MongoDb</h2> </div> 
                </div>
            </div>
            </Link>
        </div>
        
        <div className='col-lg-3'>
            <Link to='/type-script'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><SiTypescript/> </div> 
                    <div> <h2>TypeScript</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

  
    
        <div className='col-lg-3'>
            <Link to='/photoshop'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><SiAdobephotoshop /></div> 
                    <div> <h2>Photoshop</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

        <div className='col-lg-3'>
            <Link to='/sass'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><FaSass /></div> 
                    <div> <h2>Sass</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

        <div className='col-lg-3'>
            <Link to='/jquery'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><BiLogoJquery /></div> 
                    <div> <h2>jQuery</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

        <div className='col-lg-3'>
            <Link to='/html'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><FaHtml5 /></div> 
                    <div> <h2>HTML</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

        <div className='col-lg-3'>
            <Link to='/javascript'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><IoLogoJavascript/> </div> 
                    <div> <h2>JavaScript</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

        <div className='col-lg-3'>
            <Link to='/css'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><FaCss3Alt/> </div> 
                    <div> <h2>CSS</h2> </div> 
                </div>
            </div>
            </Link>
        </div>


        <div className='col-lg-3'>
            <Link to='/sql-server'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><DiMsqlServer/> </div> 
                    <div> <h2>SQL Server</h2> </div> 
                </div>
            </div>
            </Link>
        </div>

        <div className='col-lg-3'>
            <Link to='/bootstrap'>
            <div className='technology_wrapper'>  
                <div className='d-flex align-items-center'>
                    <div><BsBootstrap/> </div> 
                    <div> <h2>Bootstrap</h2> </div> 
                </div>
            </div>
            </Link>
        </div>


        
    </div>
    
    </div>
    </section>
    
      )
    }
    