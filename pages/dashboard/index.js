import React, { useState, useEffect } from 'react'

import Cookies from 'js-cookie'
import cookies from 'next-cookies'
import Router from 'next/router'

import Card from '../../components/Card'
import styles from '../../components/DashboardStyles/styles'
import PrivacyModal from '../../components/PrivacyPolicy/modal'
import { api, setHeader } from '../../utils/axios'

export default function Dashboard ({ credentials }) {
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [myCommunities, setMyCommunities] = useState([])
  const [pendingCommunities, setPendingCommunities] = useState([])
  const [pendingInvites, setPendingInvites] = useState([])

  useEffect(() => {
    const fetchMyCommunities = async () => {
      setHeader(credentials)
      const { data } = await api.get('/community/owner')
      setMyCommunities(data)
    }
    const fetchPendingCommunities = async () => {
      setHeader(credentials)
      const { data } = await api.get('/community/status/awaitingPublication')
      setPendingCommunities(data.communities)
    }
    const fetchPendingInvitations = async () => {
      setHeader(credentials)
      const { data } = await api.get('/user/invitations')
      setPendingInvites(data)
    }
    fetchMyCommunities()
    fetchPendingInvitations()
    credentials.isModerator && fetchPendingCommunities()
    setLoading(false)
  }, [])

  const handleConfirm = async () => {
    await api.delete(`/user/${credentials._id}`)
    setModal(false)
    Cookies.remove('ctech_credentials')
    Router.push('/')
  }

  const sendResponse = async ({ accept, communityId }) => {
    setHeader(credentials)
    const { data } = await api.put('/community/invitation', {
      accept,
      communityId
    })

    if (data.success) {
      setHeader(credentials)
      const { data } = await api.get('/user/invitations')
      setPendingInvites(data)
    }
  }

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="container head">
          <img
            src="/static/comunidades-tech-loader.gif"
            style={{ maxWidth: '100px', display: 'block', margin: '30px auto' }}
          />
        </div>
      )
    }
    return (
      <div className="container head">
        {pendingInvites.length > 0 && (
          <div className="columns">
            <div className="column">
              <h2 className="title is-size-6 is-uppercase has-text-centered-mobile">
                administração pendente
              </h2>
              <h4 className="is-size-6 has-text-centered-mobile">
                Você é um administrador dessa comunidade?
              </h4>

              <div
                className="columns is-multiline card-wrapper"
                style={{ marginBottom: '2rem' }}
              >
                {pendingInvites.map((invite) => (
                  <div key={invite._id} className="column is-4">
                    <div className="card invite-card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left">
                            <figure className="image is-32x32">
                              <img src={invite.logo} alt={invite.name} />
                            </figure>
                          </div>
                          <div className="media-content">
                            <p className="title is-6">{invite.name}</p>
                            {invite.location.state
                              ? <p className="subtitle is-7">
                                  {invite.location.city}, {invite.location.state}
                                </p>
                              : <p className="subtitle is-7">Remota</p>
                            }
                          </div>
                        </div>
                      </div>
                      <div className="invite-buttons">
                        <button
                          onClick={() =>
                            sendResponse({
                              accept: true,
                              communityId: invite._id
                            })
                          }
                        >
                          Sim
                        </button>
                        <button
                          onClick={() =>
                            sendResponse({
                              accept: false,
                              communityId: invite._id
                            })
                          }
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="columns">
          <div className="column">
            <h2 className="title is-size-6 is-uppercase has-text-centered-mobile">
              minhas comunidades
            </h2>
            <div className="columns is-multiline card-wrapper">
              {myCommunities.length <= 0 && pendingCommunities.length <= 0
                ? (
                <div className="column has-text-centered">
                  <img src="../static/empty-state.svg" alt="Nenhuma comunidade" />
                  <p className="empty-state">Você ainda não possui comunidades cadastradas.</p>
                </div>
                  )
                : (
                    myCommunities.map((card, i) =>
                  <div className="column is-one-quarter" key={`community-${card.id || i}`}>
                    <Card withOptions content={card} />
                  </div>
                    )
                  )}
            </div>
          </div>
        </div>
        {pendingCommunities.length > 0 && (
          <>
            <div className="is-divider"></div>
            <div className="columns">
              <div className="column">
                <h2 className="title is-size-6 is-uppercase has-text-centered-mobile">
                comunidades pendentes
                </h2>
                <div className="columns is-multiline card-wrapper">
                  {pendingCommunities.map((card, i) => (
                    <div className="column is-one-quarter" key={`pending-community-${card.id || i}`}>
                      <Card withOptions content={card} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) }
        <div className="is-divider"></div>
        <h2 className="title is-size-6 is-uppercase has-text-centered-mobile">privacidade</h2>

        <p className="info">Nós respeitamos sua privacidade. Fique à vontade para solicitar que seus dados sejam deletados. </p>
        <div className="privacy-buttons">
          <button title="Excluir meus dados" className="privacy-btn" onClick={() => setModal(true)}>Excluir meus dados</button>
        </div>
        {modal && <PrivacyModal handleConfirm={handleConfirm} handleGoBack={() => setModal(false)}/>}
        <style jsx>{styles}</style>
      </div>
    )
  }

  return renderDashboard()
}

Dashboard.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {}
  if (!credentials.token) {
    ctx.res.writeHead(302, {
      Location: '/'
    })
    ctx.res.end()
  }
}
