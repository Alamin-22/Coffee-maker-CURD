import PropTypes from 'prop-types'; // ES6
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
    const { _id, name, quantity, supplier, taste, photo } = coffee;


    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/coffee/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Coffee has been deleted.',
                                'success'
                            )
                            const remaining= coffees.filter((coffee) => coffee._id !== _id);
                            setCoffees(remaining)
                        }
                    })
            }
        })
    }



    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure><img src={photo} alt={name} /></figure>
                <div className="flex w-full justify-between p-4 items-center">
                    <div>
                        <h2 className="card-title"> Name:{name}</h2>
                        <h2 className=""> Chef:{supplier}</h2>
                        <h2 className=""> Taste:{taste}</h2>
                        <h2 className=""> Quantity:{quantity}</h2>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="btn-group btn-group-vertical space-y-3">
                            <button className="btn active:bg-orange-400">View</button>
                            <Link to={`/updatecoffee/${_id}`} className='btn active:bg-orange-400'>EDIT</Link>
                            <button onClick={() => handleDelete(_id)} className="btn active:bg-orange-400">X</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
CoffeeCard.propTypes = {
    coffee: PropTypes.object.isRequired,
    coffees: PropTypes.array.isRequired,
    setCoffees: PropTypes.func.isRequired,
}
export default CoffeeCard;