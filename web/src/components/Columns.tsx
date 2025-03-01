import { Container, Row, Card, Button } from "react-bootstrap";

interface ColumnsPassedProps{
    children: any;
}
const Columns = ({children} : ColumnsPassedProps) => (
    <div>
        <Container>
            <Row>
                {children}
            </Row>
        </Container>
    </div>

);

export default Columns;