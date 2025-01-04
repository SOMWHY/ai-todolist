import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#65C7F7] to-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white animate-bounce">
          404
        </h1>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-white mb-4">
            啊哦！页面迷路了 🚀
          </h2>
          <p className="text-white/80 mb-8">
            看起来你访问的页面已经去探索宇宙了
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-white text-[#65C7F7] rounded-full 
                       font-medium transition-transform hover:scale-105 
                       hover:shadow-lg active:scale-95"
          >
            返回首页
          </Link>
        </div>
        
        {/* 装饰性元素 */}
        <div className="mt-12 space-y-1 opacity-50">
          <div className="h-1 w-12 bg-white rounded-full mx-auto"></div>
          <div className="h-1 w-8 bg-white rounded-full mx-auto"></div>
          <div className="h-1 w-4 bg-white rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage