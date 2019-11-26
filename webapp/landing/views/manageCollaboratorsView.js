import '../../userManagement/style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import AddUserForm from '../../userManagement/edit/addUserForm'
import EditUserForm from '../../userManagement/edit/editUserForm'
import UsersTable from '../../userManagement/list/usersTable'

import { rolesAllowedToChange } from '../../../common/userManagementAccessControl'

import { getCountryName } from '../../country/actions'
import {
  fetchUsers,
  removeUser,
  updateNewUser,
  addNewUser,
  sendInvitationEmail,
  persistCollaboratorCountryAccess
} from '../../userManagement/actions'

class ManageCollaboratorsView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
    // edit user is completed, reloading users and resetting state
    if (R.prop('editUserStatus', next) === 'completed' && R.prop('editUserStatus', this.props) === 'loaded') {
      this.setState({editingUserId: null})
      this.fetch(next.match.params.countryIso)
    }
  }

  fetch (countryIso) {
    this.props.fetchUsers(countryIso)
  }

  render () {
    const {countryUsers, newUser, allowedRoles, countryIso} = this.props

    const onEditClick = (userId) => this.setState({editingUserId: userId})

    return countryUsers && !R.isEmpty(allowedRoles)
      ? this.state.editingUserId
        ? <EditUserForm
          userId={this.state.editingUserId}
          countryIso={countryIso}
          onCancel={() => this.setState({editingUserId: null})}
        />
        : <div>
          <AddUserForm {...this.props} user={newUser} countryIso={countryIso}/>
          <UsersTable {...this.props} users={countryUsers} onEditClick={onEditClick}/>
        </div>
      : null
  }
}

const mapStateToProps = (state, props) =>
  ({
    i18n: state.user.i18n,
    userInfo: state.user.userInfo,
    allowedRoles: rolesAllowedToChange(props.match.params.countryIso, R.path(['user', 'userInfo'], state)),
    countryUsers: state.userManagement.countryUsers,
    newUser: state.userManagement.newUser,
    editUserStatus: R.path(['userManagement', 'editUser', 'status'], state),
    countryIso: R.path(['match', 'params', 'countryIso'], props)
  })

export default connect(mapStateToProps, {
  fetchUsers,
  removeUser,
  updateNewUser,
  addNewUser,
  getCountryName,
  sendInvitationEmail,
  persistCollaboratorCountryAccess
})(ManageCollaboratorsView)