import React from 'react'
import Home from '../../components/Home/page'
import AboutUsSection from '../../components/About-Us/page'
import PortfolioPage from '../../components/Portfolio/page'
import TeamSection from '../../components/Team Members/page'
import ContactPage from './contact/page'

function page() {
  return (
    <div>
      <Home/>
      <AboutUsSection/>
      <TeamSection/>
      <PortfolioPage/>
       <ContactPage/>
      </div>
  )
}

export default page
