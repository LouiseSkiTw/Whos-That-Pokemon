import { Container } from "react-bootstrap";

interface ColumnPassedProps{
    children: any
}
const Column = ({children}: ColumnPassedProps) => (
    <Container className="col">
    {children}
</Container>
)

export default Column;