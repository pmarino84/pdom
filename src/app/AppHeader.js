import { nativeNode } from '../pdom/createNode'

const AppHeader = () => nativeNode.header({ className: 'app-header' }, nativeNode.h1({ className: 'app-header__title' }, 'PDOM'))

export default AppHeader
