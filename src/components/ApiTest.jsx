import React,{useState , useEffect} from "react";

const ApiTestComponent = () =>{
    const [method,setMethod] = useState("Action");
    const [apiUrl,setApiUrl] = useState("");
    //const [addHeaders , setAddHeaders] = useState(false);
    const [headerProps, setHeaderProps] = useState([]);
    const [response , setResponse] = useState("No Response Found Yet");
    const [textColor,setTextColor] = useState("black");
    //const [headers,setHeaders] = useState({});
    
      const [arr, setArr] = useState([]);
      const [body,setBody] = useState()
      //console.log(headerProps);
      const addInput = () => {
        setArr(s => {
          return [
            ...s,
            {
              type: "text",
              key: "",
              value: ""
            }
          ];
        });

        setHeaderProps(s => {
            return [
              ...s,
              {
                id: s.length,
                key: '',
                value: '',
                action: false
              }
            ];
          });
      };
    
      const handleChangeKey = e => {
        e.preventDefault();
    
        const index = e.target.id;
        setArr(s => {
          const newArr = s.slice();
          newArr[index].key = e.target.value;
          return newArr;
        });
      };

      const handleChangeValue = e => {
        e.preventDefault();
    
        const index = e.target.id;
        setArr(s => {
          const newArr = s.slice();
          newArr[index].value = e.target.value;  
          return newArr;
        });
      };
      
      const handleHeaderPropsTrue = (item,i) =>{
        setHeaderProps(headerProps.map(p => (p.id === i ? {
          ...p,
          id: i,
          key: item.key,
          value: item.value,
          action: true
        } : p)));
        //addHeadersToBody(item.key , item.value);
      }
      const handleHeaderPropsFalse = (i) =>{
        setHeaderProps(headerProps.map(p => (p.id === i ? {
          ...p,
          id: i,
          key: "",
          value: "",
          action: false
        } : p)))
      }
      //console.log(headers);
      var headers = {};
      useEffect(() => {
        headerProps.map(p => (p.action === true) ? headers[`${p.key}`] = p.value : '');
        //console.log(headers);
      },[headerProps,body])
      const addHeadersToBody = (itemKey , value) => {
        //console.log(key);
        //setHeaders({...headers,headers.itemKey = value});
        // item.key : item.value
        //setAddHeaders(true);
        //console.log(key);
        //headers[`${item.key}`] = item.value;
        //let header = {};
        //header.itemKey = value;
        //console.log(headers);
      }
    async function TestApi() {
        //const api = apiUrl;
        if(method === "GET" && apiUrl !== ""){
          await fetch(apiUrl, {
            method: method,
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setResponse("Success!! Show success response in browser console");
              setTextColor("green");
            })
            .catch((err) => {
              console.log("err", err);
              setResponse("Error!! Show error response in browser console");
              setTextColor("red");
            });
        }
        else if(method === "POST" && apiUrl !== "") {
          await fetch(apiUrl, {
            method: method,
            headers:headers,
            body: body,
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setResponse("Success!! Show success response in browser console");
            setTextColor("green");
          })
            .catch((err) => {
              console.log("err", err);
              setResponse("Error!! Show error response in browser console");
              setTextColor("red");
            });
        }
        else{
          alert("Give Correct Value");
        }
      }
      //console.log(body);
    return(
        <section className="container">
            <div className="text-center mt-3">
                <h2>Microservice API Test (Postman Web-version)</h2>
            </div>
            <div className="mt-5">
                <div className="row">
                    <div className="d-flex justify-content-end col-lg-2">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            {method}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => setMethod("GET")}>GET</a></li>
                            <li><a className="dropdown-item" onClick={() => setMethod("POST")}>POST</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-lg-8">
                    <input className="form-control" type="text" placeholder="give api-link" aria-label="default input example" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)}/>
                    </div>
                    <div className="col-lg-2">
                    <button type="submit" className="btn btn-success" onClick={TestApi}>Test API</button>
                    </div>
                </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-secondary" onClick={addInput}> + Add Headers</button>
              </div>
              <br/>
              <div className="d-flex justify-content-center">
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Key</th>
                        <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                    {arr.map((item, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">
                                    {headerProps[i].action ? (
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onMouseDown={() => handleHeaderPropsFalse(i)}/>
                                    ) : (
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onMouseDown={() => handleHeaderPropsTrue(item, i)}/>
                                    )}
                                    
                                </th>
                                <td>
                                    <input
                                        className="form-control"
                                        onChange={handleChangeKey}
                                        value={item.key}
                                        id={i}
                                        type={item.type}
                                        //size="20"
                                        placeholder="key"        
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        onChange={handleChangeValue}
                                        value={item.value}
                                        id={i}
                                        type={item.type}
                                        //size="60"
                                        placeholder="value"      
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>   
              </div>
            </div>
            {method === "POST" ? 
            <>
              <br/>
              <div className="mt-5">
                <h4 className="text-center">Add Body Data (only raw data available)</h4>
                <div className="card">
                  <div className="card-body">
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="{}" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            </> : <></>}
            <br/>
            <div className="mt-5">
              <h4 className="text-center">Response</h4>
              <div className="card">
                <div className="card-body" style={{color:textColor}}>
                  {response}
                </div>
              </div>
            </div>
        </section>
    )
}

export default ApiTestComponent;