import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="relative">
           <div className="fixed inset-0 -z-10);" style={{ top: '65px', height: 'calc(155vh - 100px'}}>
        <img 
          src="/img-soluctions.gif" 
          alt="Background" 
          className="margin-image w-full h-full object-cover"
        />        
      </div>
      
      <div className="flex flex-col items-center justify-center  p-4" style={{ height: 'calc(155vh - 290px'}} >
        <div className="max-w-md w-full custom-bg backdrop-blur-sm p-8 rounded-lg shadow-md text-center border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bem-vindo ao Task Manager
          </h1>
          <p className="text-2xl text-white mb-6">
            Gerencie suas tarefas de forma <span className="text-green-300">simples</span> e eficiente!!!
          </p>
          <div className="flex justify-center">
            <Link 
              to="/dashboard" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Começar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home