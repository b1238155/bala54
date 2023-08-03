import React,{useState,useEffect} from "react";
import "./Styles.css";
import Sidenavbar from "../components/Sidenavbar";
import Navbartitle from "../components/Navbartitle";
import {
  Card,
  Col,
  Row,
  //   Form,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import * as formik from "formik";
// import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { BiRightArrowAlt } from "react-icons/bi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { changeBatchDetails } from "../redux/FormSlice";

export default function BatchDetails({onButtonClick}) {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    batchno: "",
    batchSize: "",
    packing:"",
    mfgdate:"",
    expdate:"",
    retestdate:"",
    sample:"",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    
  };
  const handleSubmit = (e) => {
   e.preventDefault();
    //const id = inputs.length +1;
    setFormErrors(validate(inputs))
    
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs([{
         batchno: "",
        batchSize: "",
        packing:"",
        mfgdate:"",
        expdate:"",
        retestdate:"",
        sample:""
      }]);
    } else {
      setTableData([...tableData, inputs]);
      setInputs([{
        batchno: "",
        batchSize: "",
        packing:"",
        mfgdate:"",
        expdate:"",
        retestdate:"",
        sample:""
      }]);
    }
    
    //setIsSubmit(true)
  };
  useEffect(() => {
    
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(inputs);
    }
  }, [formErrors]);

const handleDispatch=()=>{
  dispatch(changeBatchDetails(inputs)
  )
  onButtonClick("TypeOfAnalysis")
}


  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ batchno: tempData.batchno, batchSize: tempData.batchSize, packing: tempData.packing, 
    mfgdate:tempData.mfgdate,expdate: tempData.expdate, retestdate:tempData.retestdate,sample: tempData.sample });
    setEditClick(true);
    setEditIndex(index);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.batchno) {
      errors.batchno = "This field is required!";
    }
    if (!values.mfgdate) {
      errors.mfgdate = "This field is required!";
    }
    if (!values.expdate) {
      errors.expdate = "This field is required!";
    }
    if (!values.retestdate) {
      errors.retestdate = "This field is required!";
    }
    return errors;
  };
  return (
    <div>
    

      <div>
    
        <div>
          <div >
            <div>
                <form onSubmit={handleSubmit}>
                {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                  setIsSubmit(true)):(
                    console.log("error")
                      )} */}
              <Card className="maincards">
                <div className="cardtitle">
                  <text className="cardtitlehed">Batch Details</text>
                </div>
                <div className="cardcolumnpadding">
                  {/* ---------------------------------   card column start  -------------------------------------------- */}

                  <Row className="mb-3 rowtabview">
                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Batch No./Lot No(s)
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" 
                        name="batchno"
                         value={inputs.batchno}
                         onChange={handleChange}/>
                      </div>
                      <p style={{color:"red"}}>{formErrors.batchno}</p>
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Batch Size
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" 
                        name="batchSize"
                        value={inputs.batchSize}
                        onChange={handleChange}/>
                      </div>

                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                          {" "}
                          Nature Of Packing
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"
                        name="packing"
                        value={inputs.packing}
                        onChange={handleChange} />
                      </div>
                    </Col>
                  </Row>

                  {/* ---------------------------------   card column start  -------------------------------------------- */}

                  <Row className="mb-3 rowtabview">
                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Mfg. Date
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="date" className="cardcolumninputtype"
                        name="mfgdate"
                        value={inputs.mfgdate}
                        onChange={handleChange} />
                      </div>
                      <p style={{color:"red"}}>{formErrors.mfgdate}</p>
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Exp. Date
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="date" className="cardcolumninputtype"
                        name="expdate"
                        value={inputs.expdate}
                        onChange={handleChange}
                        min={inputs.mfgdate} />
                      </div>
                      <p style={{color:"red"}}>{formErrors.expdate}</p>
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Retest Date
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="date" className="cardcolumninputtype" 
                        name="retestdate"
                        value={inputs.retestdate}
                        min={inputs.expdate}
                        onChange={handleChange}/>
                      </div>
                      <p style={{color:"red"}}>{formErrors.retestdate}</p>
                    </Col>
                  </Row>

                  {/* ---------------------------------   card column start  -------------------------------------------- */}

                  <Row className="mb-3 rowtabview">
                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Sample Quantity
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"
                        name="sample"
                        value={inputs.sample}
                        onChange={handleChange} />
                      </div>
                    </Col>

                    <Col>
                      {/* <div>
<label className="cardcolhed">Batch Size
<text className="cardcolhedstar">*</text>
</label>
</div>
<div>
<input type="date"  className="cardcolumninputtype" />
</div> */}
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div className="cardbuttonwiddouble">
                        {/* <input type="date" className="cardcolumninputtype"/> */}

                        <button type="reset"
                          className="cardbutton"
                        
                        >
                          <AiOutlineClose size={24} /> Clear
                        </button>
                        
                        <button type="submit"
                          className="cardbutton"
                          //  onClick={() => navigate("batchdetails")}
                        >
                             {editClick ? "update" : "Add"}
                          <MdOutlineAdd size={24} />
                        </button>
                         
                      </div>
                    </Col>
                  </Row>

                  {/* ---------------------------------   card column start  -------------------------------------------- */}

                  <hr className="hrcolor" />

                  {/* <Card className="cardtablesize"> */}
                  <Table responsive border={1}>
                    <thead className="table-custom">
                      <tr>
                        <th>S.No</th>
                        <th>Batch No./Lot No(s)</th>
                        <th>Batch Size</th>
                        <th>Nature Of Packaging</th>
                        <th>Mfg. Date</th>
                        <th>Exp. Date</th>
                        <th>Retest Date</th>
                        <th>Sample Quantity</th>
                        <th>Edit & Delete</th>
                      </tr>
                    </thead>
                   
                    <tbody className="tablebody-custom ">
                    {tableData.map((item, i) => (
                      <tr>
                        <td>{i+1}</td>
                                <td>{item.batchno}</td>
                        <td>{item.batchSize}</td>
                        <td>{item.packing}</td>
                        <td>{item.mfgdate}</td>
                        <td>{item.expdate}</td>
                        <td>{item.retestdate}</td>
                        <td>{item.sample}</td>
                        <td>
                          <div className="tablerowicon">
                            <BiEdit size={20} color={"#9AC037"} onClick={() => handleEdit(i)} />
                            <RiDeleteBinLine size={20} color={"#9AC037"}  onClick={() => handleDelete(i)}/>
                          </div>
                        </td>
                      </tr>

))}


                    </tbody>
                   
                  </Table>
                  {/* </Card> */}

                  <div className="cardbuttonboubleend">
                    <button
                      className="cardbuttonoutline"
                       onClick={() => onButtonClick("SampleDetails")}
                    >
                      <BiLeftArrowAlt size={24} /> Previous
                    </button>
                    <button
                      className="cardbutton"
        
                      onClick={handleDispatch}
                    >
                      Next <BiRightArrowAlt size={24} />
                    </button>
                
                  </div>

                  {/* ---------------------------------   card column end  -------------------------------------------- */}
               
                </div>
              </Card>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}