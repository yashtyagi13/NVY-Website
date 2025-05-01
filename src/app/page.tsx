import React from 'react'
import Home from '../../components/Home/page'
import AboutUsSection from '../../components/Contact-Us/page'
import PortfolioPage from '../../components/Portfolio/page'
// import TeamSection from '../../components/Team Members/page'

function page() {
  return (
    <div>
      <Home/>
      <AboutUsSection/>
      {/* <TeamSection/> */}
      <PortfolioPage/>
    </div>
  )
}

export default page
