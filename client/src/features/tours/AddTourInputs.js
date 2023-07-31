import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';

export default function AddTourInputs({ formData, handleChange }) {
    const tourErrors = useSelector(state => state.tours.addTourErrors)

    return (
        <>
            <Form.Group>
                <Form.Label>Date of Tour *</Form.Label>
                <Form.Control required
                            type="date"
                            name="tourDate"
                            value={formData.tourDate}
                            onChange={handleChange} />
                <Form.Label className="pt-2">Meeting Time (Hours) *</Form.Label>
                <Form.Control required as="select" name="meetingTimeHours" value={formData.meetingTimeHours} onChange={handleChange}>
                    <option value=''>Choose hour to meet</option>
                    {Array(24).fill(0).map((_,i) => i).map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                <Form.Label className="pt-2">Meeting Time (Minutes) *</Form.Label>
                <Form.Control required as="select" name="meetingTimeMinutes" value={formData.meetingTimeMinutes} onChange={handleChange}>
                    <option value=''>Choose minute to meet</option>
                    {[0, 15, 30, 45].map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {tourErrors && tourErrors.tour_date ? tourErrors.tour_date.map(e => <p key={e}>{`Tour date ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label className="pt-2">Duration (Hours) *</Form.Label>
                <Form.Control required as="select" name="durationHours" value={formData.durationHours} onChange={handleChange}>
                    <option value=''>Choose tour duration hours</option>
                    {Array(23).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                <Form.Label className="pt-2">Duration (Minutes) *</Form.Label>
                <Form.Control required as="select" name="durationMinutes" value={formData.durationMinutes} onChange={handleChange}>
                    <option value=''>Choose tour duration minutes</option>
                    {[0, 15, 30, 45].map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {tourErrors && tourErrors.duration ? tourErrors.duration.map(e => <p key={e}>{`Tour duration ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label className="pt-2">Meeting Location *</Form.Label>
                <Form.Control required name="meetingLocation" value={formData.meetingLocation} onChange={handleChange} />
                {tourErrors && tourErrors.meeting_location ? tourErrors.meeting_location.map(e => <p key={e}>{`Meeting location ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group className="pb-2">
                <Form.Label className="pt-2">Available Slots *</Form.Label>
                <Form.Control required as="select" name="availableSlots" value={formData.availableSlots} onChange={handleChange}>
                    <option value=''>Choose amount of available slots</option>
                    {Array(20).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {tourErrors && tourErrors.available_slots ? tourErrors.available_slots.map(e => <p key={e}>{`Available slots ${e}`}</p>) : null}
            </Form.Group>
        </>
    )
}