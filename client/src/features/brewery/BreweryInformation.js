import ListGroup from "react-bootstrap/esm/ListGroup";

export default function BreweryInformation({ name, website, address, city, postal_code }) {
    
    return (
        <ListGroup className="w-50">
            <ListGroup.Item>{`Name: ${name}`}</ListGroup.Item>
            <ListGroup.Item>{`Website: ${website}`}</ListGroup.Item>
            <ListGroup.Item>{`Address: ${address}`}</ListGroup.Item>
            <ListGroup.Item>{`City: ${city}`}</ListGroup.Item>
            <ListGroup.Item>{`Postal Code: ${postal_code}`}</ListGroup.Item>
        </ListGroup>
    )
}