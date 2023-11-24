import { Layout } from 'antd';
import { NavLink, useLocation } from "react-router-dom"
import classNames from 'classnames';

const { Header, Content, Footer } = Layout;

const HeaderNav = ({ to, children }) => {
    const location = useLocation()

    return (
        <NavLink to={to} className={classNames({
            'text-lg font-semibold px-3 hover:text-gray-400': true,
            "text-gray-500": location.pathname !== to,
            "text-gray-300": location.pathname === to
        })} >{children}</NavLink>
    )
}

function DefaultLayout({ children }) {
    return (
        <div>
            <Header>
                <div className='inline-flex gap-3 w-full items-center'>
                    <div className='inline-flex gap-1 text-lg'>
                        <div className='font-bold text-gray-400'>MockNet</div>
                        <div className='font-light text-gray-500'>Dashboard</div>
                    </div>

                    <div className='inline-flex'>
                        <HeaderNav to={"/"}>Microservices</HeaderNav>
                        <HeaderNav to={"/cluster"}>Cluster</HeaderNav>
                        <HeaderNav to={"/networkCosts"}>Network Costs</HeaderNav>
                    </div>
                </div>
            </Header>
            <Content className='px-10 py-5 bg-gray-200 min-h-screen'>
                {children}
            </Content>
            <Footer></Footer>
        </div>
    )
}

export default DefaultLayout