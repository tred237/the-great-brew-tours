import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';

import { sortAscending } from '../../helpers/sort';

export default function AddTourCheckbox({ handleChange }) {
    const breweries = useSelector(state => state.breweries.breweries)
    const tourErrors = useSelector(state => state.tours.addTourErrors)

    return (
        <Form.Group>
            <Form.Label>Breweries *</Form.Label>
            {tourErrors && tourErrors.tour_breweries ? tourErrors.tour_breweries.map(e => <p className="error-message" key={e}>{e}</p>) : null}
            <Row md={2}>
                {breweries.slice().sort((a,b) => sortAscending(a.name.toLowerCase(), b.name.toLowerCase())).map(b => {
                    return (<Form.Check key={b.id}
                    type='checkbox'
                    name='breweries'
                    value={b.id}
                    label={b.name}
                    onChange={handleChange} />)
                })}
            </Row>
        </Form.Group>
    )
}