import React, { Fragment, useEffect } from "react";
import "./Dashboard.css";

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";
import { connect } from "react-redux";
import "./Dashboard.css";
import { loadUser } from "../../_actions/authAction";
import { getOverAllSumInv } from "../../_actions/investmentAction";
import { getOverAllSumExp } from "../../_actions/expenseAction";
import { getTotalRations } from "../../_actions/rationAction";

import { logout } from "../../_actions/authAction";

const Dashboard = ({
    loading,
    overAllInvestment,
    overAllExpenses,
    totalRation,
    auth: {
        firstName,
        lastName,
        user: { username, image, email, role },
    },
    loadUser,
    logout,
    getOverAllSumInv,
    getOverAllSumExp,
    getTotalRations,
}) => {
    useEffect(() => {
        loadUser();
        getOverAllSumInv();
        getOverAllSumExp();
        getTotalRations();
    }, [loadUser, getOverAllSumInv, getOverAllSumExp, getTotalRations]);

    const me = <Link to="/myprofile">{!username ? "" : username}</Link>;

    const totalInvest = overAllInvestment.map((p) => p.totalInvest);
    const totalRationKit = totalRation.map((p) => p.totalRation);
    const totalExpense = overAllExpenses.map((p) => p.totalExpense);

    const balence = totalInvest[0] ? totalInvest[0] : 0;

    const balanceRemaining =
        Math.round((balence - (totalExpense ? totalExpense : 0)) * 100) / 100;
    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <div>
                            <div className="container">
                                <div className="col-sm-12 col-md-8 col-lg-8">
                                    <div className="row">

                                        <div className="col-lg-3 col-md-5 col-sm-6">
                                            <div className="circle-tile ">
                                                <a href="#">
                                                    <div className="circle-tile-heading red">
                                                        <i className="fa fa-inr fa-fw fa-2x"></i>
                                                    </div>
                                                </a>
                                                <div className="circle-tile-content red">
                                                    <div className="circle-tile-description text-faded">
                                                        Avialable Donation (INR)
                    </div>
                                                    <div className="circle-tile-number text-faded ">
                                                        {balanceRemaining} ={" "}
                                                        <small className="text-white">{`(${
                                                            Math.round((balanceRemaining / 785) * 10) / 10
                                                            } Kit)`}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-md-5 col-sm-6">
                                            <div className="circle-tile ">
                                                <Link to="/admin/ration/allRation">
                                                    <div className="circle-tile-heading orange">
                                                        <i className="fa fa-medkit fa-fw fa-2x"></i>
                                                    </div>
                                                </Link>
                                                <div className="circle-tile-content orange">
                                                    <div className="circle-tile-description text-faded">
                                                        Kit Delivered
                  </div>
                                                    <div className="circle-tile-number text-faded ">
                                                        {!totalRationKit[0] ? 0 : totalRationKit[0]}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="col-lg-3 col-md-5 col-sm-6">
                                            <div className="circle-tile ">
                                                <Link to="/admin/expenses/viewAllexpenses">
                                                    <div className="circle-tile-heading cyan">
                                                        <i className="fa fa-cart-arrow-down fa-fw fa-2x"></i>
                                                    </div>
                                                </Link>
                                                <div className="circle-tile-content cyan">
                                                    <div className="circle-tile-description text-faded">
                                                        Total Expense (INR)
                        </div>
                                                    <div className="circle-tile-number text-faded ">
                                                        {" "}
                                                        {!totalExpense[0]
                                                            ? 0
                                                            : parseFloat(totalExpense).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-md-5 col-sm-6">
                                            <div className="circle-tile ">
                                                <Link to="/admin/investment/viewAllinvestment">
                                                    <div className="circle-tile-heading green">
                                                        <i className="fa fa-money fa-fw fa-2x"></i>
                                                    </div>
                                                </Link>
                                                <div className="circle-tile-content green">
                                                    <div className="circle-tile-description text-faded">
                                                        {" "}
                          Total Donated Amount (INR)
                        </div>
                                                    <div className="circle-tile-number text-faded ">
                                                        {!totalInvest[0]
                                                            ? 0
                                                            : parseFloat(totalInvest).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="container mb-4 pb-4">
                                <div className="row mb-1  animated fadeIn">
                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link to="/guest/myreport" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-dark h-100 w-100">
                                                <div className="card-body bg-dark">
                                                    <div className="rotate">
                                                        <i className="fa fa-bar-chart fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase text-white">Reports</h4>
                                                    <small>View All Reports</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link
                                            to="/admin/allPayment"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <div className="card text-white purple h-100 w-100">
                                                <div className="card-body purple">
                                                    <div className="rotate">
                                                        <i className="fa fa-money fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase text-white">
                                                        Donate Now
                        </h4>
                                                    <small>Donating Options</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link
                                            to="/kitrequest"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <div className="card text-white bg-warning h-100 w-100">
                                                <div className="card-body bg-warning">
                                                    <div className="rotate">
                                                        <i className="fa fa-medkit fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase text-dark">
                                                        Kit Request
                        </h4>
                                                    <small>Request Kit for Needy People</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                    <div className="col-xl-2 col-sm-6 py-2">
                                        <Link
                                            to="/contactus"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <div className="card text-white gray h-100 w-100">
                                                <div className="card-body gray">
                                                    <div className="rotate">
                                                        <i className="fa fa-phone-square fa-4x"></i>
                                                    </div>
                                                    <h4 className="text-uppercase text-white">
                                                        Contact Us
                        </h4>
                                                    <small>Want to use this app free?</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Thought */}
                        <div className="container  mt-2 pt-2 mb-4 pb-4">
                            <div className="card thought col-sm-6 mx-auto text-center bg-light pt-3 animated pulse">
                                <p className="text-secondary">
                                    “The purpose of this initiative is to help people who are struggling to get essentials because of the lockdown.
                  The fund is being collected and managed by<br /> <strong>Manna Wa Salwa, Jamshedpur, Jharkhand, India</strong>”
                        </p>
                            </div>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
};
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,

    loadUser: PropTypes.func.isRequired,
    getOverAllSumInv: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getOverAllSumExp: PropTypes.func.isRequired,
    getTotalRations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    loading: state.auth.loading,
    overAllInvestment: state.investment.overAllInvestment,
    overAllExpenses: state.expense.overAllExpenses,
    totalRation: state.ration.totalRation,
});
export default connect(mapStateToProps, {
    loadUser,
    logout,
    getOverAllSumInv,
    getOverAllSumExp,
    getTotalRations,
})(withRouter(Dashboard));

// <div className="row">
//                                     <button type="submit" className="py-3 px-5 bg-success text-white font-weight-bold mt-3">Inv- ${totalInvest}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3">Exp- $  {totalExpense}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-warning text-white border-0 rounded font-weight-bold mt-3">CustPay- $  {totalCustPay}</button>
//                                     <button type="submit" className="d-block py-3 px-5 bg-dark text-white border-0 rounded font-weight-bold mt-3">Rem- $  {balanceRemaining}</button>

//                                 </div>
