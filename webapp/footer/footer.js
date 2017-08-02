import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'
import { logout, switchLanguage } from '../user/actions'

class FooterSelectionControl extends React.Component {
  componentWillMount () {
    this.setState({opened: false})
  }

  render () {
    const iconRefSuffix = this.state.opened ? 'down' : 'up'
    const children = this.props.children
    return <span
      className="footer__user-control"
      onClick={evt => this.setState({opened: !this.state.opened})}>
      {this.props.label + ' '}
      <svg className="icon icon-sub">
        <use xlinkHref={`img/icon.svg#icon-small-${iconRefSuffix}`}/>
      </svg>
      {
        this.state.opened ? children : null
      }
    </span>
  }
}

const UserInfo = props =>
  <FooterSelectionControl label={props.userName} {...props}>
    <div className="footer__selection-control-opened">
      <div onClick={() => props.logout()} className="footer__selection-control-item">
        {props.i18n.t('footer.logout')}
      </div>
    </div>
  </FooterSelectionControl>

const LanguageSelection = ({i18n, switchLanguage, ...props}) =>
  <FooterSelectionControl label={i18n.t(`language.${i18n.language}`)} {...props}>
    <div className="footer__selection-control-opened">
      {
        R.map(
          lang => lang !== i18n.language
            ? <div key={lang} className="footer__selection-control-item" onClick={() => switchLanguage(lang)}>
              {i18n.t(`language.${lang}`)}
            </div>
            : null,
          supportedLangs)
      }
    </div>
  </FooterSelectionControl>

const supportedLangs = [
  'en',
  'fr'
]

const Footer = ({status, userInfo, path, width, i18n, ...props}) => {
  const style = {width: `calc(100vw - ${width}px)`}
  return <div className="footer__container" style={style}>
    {/* Placeholder for space-between flexbox alignment */}
    <div/>
    <div className="footer__item">
      {status
        ? <span className="footer__autosave-status">{i18n.t(`footer.autoSave.${status}`)}</span>
        : null
      }
    </div>
    <div>
      <div className="footer__item">
        <LanguageSelection i18n={i18n} {...props}/>
      </div>
      <div className="footer__item">
        <UserInfo userName={userInfo.name} i18n={i18n} {...props}/>
      </div>
    </div>
  </div>
}

const mapStateToProps = state =>
  R.pipe(
    R.merge(state.autoSave),
    R.merge(state.user))(state.router)

export default connect(mapStateToProps, {logout, switchLanguage})(Footer)
