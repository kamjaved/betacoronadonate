import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getRations,
    deleteRation,
    setCurrentRation
} from "../../_actions/rationAction";
import moment from 'moment'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewRation = ({
    getRations,
    deleteRation,
    setCurrentRation,
    rations,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getRations();
        //eslint-disable-next-line
    }, [getRations]);


    const onDeleteHandler = id => {
        deleteRation(id);
    };

    //----SORTING--------------

    const [state, setState] = useState({
        sortDate: [],
        sortAmount: [],
        isToggle: true,
        isAmntToggle: true,
    })
    const { sortDate, isToggle, sortAmount, isAmntToggle } = state;


    const datesort1 = (e) => {
        let newDateSort = rations
        if (isToggle) {
            newDateSort.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() })
        } else {
            newDateSort.sort((a, b) => { return new Date(b.date).getTime() - new Date(a.date).getTime() })
        }
        setState({
            sortDate: newDateSort
        })
    }

    const datesort = (e) => {
        datesort1()
        setState({
            isToggle: !isToggle,
        })
    }

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> Your Added Delivered Kit </h2>
                                <br />
                                <div className="row">

                                    <table className="table table-hover table-sm mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col" onClick={datesort} >Date</th>
                                                <th scope="col">Kit Delivered</th>
                                                <th scope="col">Desc</th>
                                                <th scope="col" className="text-right">
                                                    Action
                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {rations.map(ration => (
                                                <tr key={ration._id}>
                                                    <td>{moment(ration.date).format("DD-MM-YYYY")}</td>
                                                    <td>{!ration.rationKit ? "NA" : ration.rationKit}</td>
                                                    <td>{!ration.desc ? "NA" : ration.desc}</td>

                                                    <td className="text-right">
                                                        <Link
                                                            to={`/admin/editRation/${ration._id}`}
                                                            onClick={() => setCurrentRation(ration)}
                                                        >
                                                            <i className="fa fa-edit fa-lg mr-4"></i>
                                                        </Link>
                                                        <Link
                                                            title="Delete"
                                                            to="#!"
                                                            onClick={() => onDeleteHandler(ration._id)}
                                                        >
                                                            <i className="fa fa-trash text-danger fa-lg"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

ViewRation.propTypes = {
    getRations: PropTypes.func.isRequired,
    deleteRation: PropTypes.func.isRequired,
    setCurrentRation: PropTypes.func.isRequired,
    rations: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    rations: state.ration.rations,
    filtered: state.ration.filtered,
    loading: state.ration.loading
});
export default connect(
    mapStateToProps,
    { getRations, deleteRation, setCurrentRation }
)(ViewRation);




// const datesort1 = (e) => {
//     let newDateSort = rations
//     if (isOldestFirst) {
//         newDateSort.sort((a, b) => a.amount - b.amount)
//     } else {
//         newDateSort.sort((a, b) => b.amount - a.amount)
//     }
//     setState({
//         isOldestFirst: false,
//         sortDate: newDateSort
//     })
// }