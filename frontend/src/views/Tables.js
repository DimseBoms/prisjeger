/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import PrisDataService from "../axios/prisdata-service"
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import prisdataService from "../axios/prisdata-service";

class Pristabell extends React.Component {
  constructor() {
    super()
    this.state = {
      vareliste: [],
      butikkliste: [],
    }
  }
  componentDidMount() {
    prisdataService.getVareliste().then((response) => {
      this.setState({ vareliste: response.data })
    })
    prisdataService.getButikkliste().then((response) => {
      this.setState({ butikkliste: response.data })
    })
  }
  render() {
    let tabellJsx = this.state.vareliste.map((vare, index) => {
       return (
        <tr key={index}>
          <td>{vare}</td>
        </tr>
      )
    })
    let butikkJsx = this.state.butikkliste.map((butikk, index) => {
      return (
        <th key={index}>{butikk}</th>
      )
    })
    return (
      <>
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Pristabell</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Vare</th>
                        {butikkJsx}
                        <th className="text-right">Gjennomsnitt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabellJsx}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

// function Tables() {
//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h4">Simple Table</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Table responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       <th>Name</th>
//                       <th>Country</th>
//                       <th>City</th>
//                       <th className="text-right">Salary</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Dakota Rice</td>
//                       <td>Niger</td>
//                       <td>Oud-Turnhout</td>
//                       <td className="text-right">$36,738</td>
//                     </tr>
//                     <tr>
//                       <td>Minerva Hooper</td>
//                       <td>Curaçao</td>
//                       <td>Sinaai-Waas</td>
//                       <td className="text-right">$23,789</td>
//                     </tr>
//                     <tr>
//                       <td>Sage Rodriguez</td>
//                       <td>Netherlands</td>
//                       <td>Baileux</td>
//                       <td className="text-right">$56,142</td>
//                     </tr>
//                     <tr>
//                       <td>Philip Chaney</td>
//                       <td>Korea, South</td>
//                       <td>Overland Park</td>
//                       <td className="text-right">$38,735</td>
//                     </tr>
//                     <tr>
//                       <td>Doris Greene</td>
//                       <td>Malawi</td>
//                       <td>Feldkirchen in Kärnten</td>
//                       <td className="text-right">$63,542</td>
//                     </tr>
//                     <tr>
//                       <td>Mason Porter</td>
//                       <td>Chile</td>
//                       <td>Gloucester</td>
//                       <td className="text-right">$78,615</td>
//                     </tr>
//                     <tr>
//                       <td>Jon Porter</td>
//                       <td>Portugal</td>
//                       <td>Gloucester</td>
//                       <td className="text-right">$98,615</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md="12">
//             <Card className="card-plain">
//               <CardHeader>
//                 <CardTitle tag="h4">Table on Plain Background</CardTitle>
//                 <p className="card-category">
//                   Here is a subtitle for this table
//                 </p>
//               </CardHeader>
//               <CardBody>
//                 <Table responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       <th>Name</th>
//                       <th>Country</th>
//                       <th>City</th>
//                       <th className="text-right">Salary</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Dakota Rice</td>
//                       <td>Niger</td>
//                       <td>Oud-Turnhout</td>
//                       <td className="text-right">$36,738</td>
//                     </tr>
//                     <tr>
//                       <td>Minerva Hooper</td>
//                       <td>Curaçao</td>
//                       <td>Sinaai-Waas</td>
//                       <td className="text-right">$23,789</td>
//                     </tr>
//                     <tr>
//                       <td>Sage Rodriguez</td>
//                       <td>Netherlands</td>
//                       <td>Baileux</td>
//                       <td className="text-right">$56,142</td>
//                     </tr>
//                     <tr>
//                       <td>Philip Chaney</td>
//                       <td>Korea, South</td>
//                       <td>Overland Park</td>
//                       <td className="text-right">$38,735</td>
//                     </tr>
//                     <tr>
//                       <td>Doris Greene</td>
//                       <td>Malawi</td>
//                       <td>Feldkirchen in Kärnten</td>
//                       <td className="text-right">$63,542</td>
//                     </tr>
//                     <tr>
//                       <td>Mason Porter</td>
//                       <td>Chile</td>
//                       <td>Gloucester</td>
//                       <td className="text-right">$78,615</td>
//                     </tr>
//                     <tr>
//                       <td>Jon Porter</td>
//                       <td>Portugal</td>
//                       <td>Gloucester</td>
//                       <td className="text-right">$98,615</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

export default Pristabell;
