import React, {Component} from 'react';
import ServiceUser from "../../../services/ServiceUser";
import {Button, Card, CardDeck, Container, Row, Table} from "react-bootstrap";
import jsPDF from "jspdf";


class ViewAllUsers extends Component {
    summaryBox = {
        color: '#000000',
        textAlign: 'left',
        margin: '20px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#ffffff'
    }
    divConBack = {
        color: 'white',
        paddingTop: '20px',
        paddingBottom: '20px',
        border:'5px green solid',
        overflow: 'hidden'
    }
    summaryBox2 = {
        color: '#000000',
        textAlign: 'center',
        paddingRight:'10px',
        borderRadius: '30px',
        backgroundColor: '#ffffff'
    }
    constructor(props) {
        super(props);
       this.generateUserReport = this.generateUserReport.bind();
        this.state = {
            userList:[],
            isLoading: true,
        }
    }

    componentDidMount = async () => {
        await ServiceUser.getAllUsers()
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    userList: data,
                    isLoading: false
                });
                console.log(data);
            }).catch(error =>
                console.log(error.message)
            )
            .catch(error =>
                this.setState({
                    error,
                    isLoading: true
                })
            );
    }

    // TODO: Generate Laptop ARM PDF
    generateUserReport = () => {
        const document = new jsPDF();
        const tableColumn = ["NAME", "EMAIL", "ROLE"];
        const tableRows = [];

        this.state.userList.map((user) => {
            const value = [
                user.username,
                user.email,
                user.roles[0].name
            ];
            tableRows.push(value);
        });

        document.autoTable(tableColumn, tableRows, {startY: 20});

        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

        document.text(`All Users In The System`, 14, 15);
        document.save(`all_users_detail_report_${dateStr}.pdf`);
    }


    render() {
        const { isLoading ,userList} = this.state;
        return (
            <div style={this.summaryBox}>
                <Container style={this.divConBack}>
                    <div style={this.summaryBox2}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header className={'bg-dark text-white text-center'} style={{fontSize:"20px", fontWeight: 'bold'}}>
                            Generate Report
                        </Card.Header>
                        <Card.Body>
                            <Button onClick={this.generateUserReport} className={'btn btn-primary'}>Download Report</Button>
                        </Card.Body>
                     </Card>
                    </div>
                <br></br>
                <Table striped bordered hover dark>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading ? (
                            userList.map((users) => {
                                return (
                                    <tr key={users.id}>
                                        <td>{users.username}</td>
                                        <td>{users.email}</td>
                                        <td>{users.roles[0].name}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td>Loading...</td>
                                <td>Loading...</td>
                                <td>Loading...</td>
                            </tr>
                        )}

                    </tbody>
                </Table>


                {/*<>*/}
                {/*    <Container fluid={true}>*/}
                {/*        <Row>*/}
                {/*            <CardDeck className=' no-gutters '>*/}
                {/*                {userList.map((postData,) => {*/}
                {/*                    console.log(postData);*/}
                {/*                    return (*/}
                {/*                        <Card  key={postData.id}>*/}
                {/*                            <Card.Body>*/}
                {/*                                <Card.Title>*/}
                {/*                                    {postData.username}*/}
                {/*                                </Card.Title>*/}
                {/*                                <Card.Subtitle>*/}
                {/*                                    {postData.roles[0].name + " "}*/}
                {/*                                </Card.Subtitle>*/}

                {/*                                <Card.Text>*/}
                {/*                                    {postData.email}*/}
                {/*                                </Card.Text>*/}
                {/*                            </Card.Body>*/}
                {/*                        </Card>*/}
                {/*                    );*/}
                {/*                })}*/}
                {/*            </CardDeck>*/}
                {/*        </Row>*/}
                {/*    </Container>*/}
                {/*</>*/}
                </Container>
            </div>
        );
    }
}

export default ViewAllUsers;