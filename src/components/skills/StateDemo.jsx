import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'

const catalog = [
  { id: 1, name: 'Product A', price: 29000, emoji: '🎧' },
  { id: 2, name: 'Product B', price: 18000, emoji: '📦' },
  { id: 3, name: 'Product C', price: 49000, emoji: '💻' },
  { id: 4, name: 'Product D', price: 12000, emoji: '🖱️' },
]

export default function StateDemo() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  function getQty(id) {
    return cart.find((i) => i.id === id)?.qty || 0
  }

  function changeQty(product, delta) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (!exists && delta > 0) return [...prev, { ...product, qty: 1 }]
      return prev
        .map((i) => i.id === product.id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    })
  }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="relative rounded-xl" style={{ height: '300px' }}>
      {/* Main content */}
      <div className="flex flex-col gap-3 pt-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] text-black/25 tracking-widest uppercase">장바구니 데모</p>
          <div className="relative">
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-black/10 bg-black/[0.03] text-black/50 rounded-lg text-xs hover:bg-black/6 transition-colors"
            >
              <ShoppingCart size={12} />
              장바구니
            </button>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black rounded-full text-[9px] text-white flex items-center justify-center font-bold pointer-events-none"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-2">
          {catalog.map((product) => {
            const qty = getQty(product.id)
            const inCart = qty > 0

            return (
              <div
                key={product.id}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 ${
                  inCart ? 'border-black/20 bg-black/[0.03]' : 'border-black/[0.07] bg-white hover:border-black/15 hover:shadow-sm'
                }`}
              >
                <span className="text-xl flex-shrink-0">{product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-black truncate">{product.name}</p>
                  <p className="text-[10px] text-black/35 font-mono">{product.price.toLocaleString()}원</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <AnimatePresence>
                    {inCart && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => changeQty(product, -1)}
                        className="w-6 h-6 bg-black/5 hover:bg-black/10 rounded-md text-black/50 flex items-center justify-center transition-colors"
                      >
                        <Minus size={10} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                  {inCart && (
                    <span className="text-xs text-black font-bold w-4 text-center">{qty}</span>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => changeQty(product, 1)}
                    className="w-6 h-6 bg-black/5 hover:bg-black/10 rounded-md text-black/50 flex items-center justify-center transition-colors"
                  >
                    <Plus size={10} />
                  </motion.button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Side cart drawer — overlay inside demo */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/20 rounded-xl z-10"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-[70%] bg-white dark:bg-[#111] border border-black/8 dark:border-white/8 rounded-xl z-20 flex flex-col shadow-xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-black/6">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={13} className="text-black/50" />
                  <span className="text-xs font-semibold text-black">장바구니</span>
                  {totalItems > 0 && (
                    <span className="w-4 h-4 bg-black rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-lg hover:bg-black/5 text-black/30 hover:text-black transition-colors"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Drawer items */}
              <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-black/20">
                    <ShoppingCart size={24} />
                    <p className="text-xs">비었어요</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 p-2.5 rounded-xl border border-black/[0.06] bg-[#fafaf8]"
                      >
                        <span className="text-base">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-black truncate">{item.name}</p>
                          <p className="text-[10px] text-black/35 font-mono">{(item.price * item.qty).toLocaleString()}원</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => changeQty(item, -1)} className="w-5 h-5 bg-black/5 hover:bg-black/10 rounded text-black/40 flex items-center justify-center">
                            <Minus size={8} />
                          </button>
                          <span className="text-[11px] font-bold text-black w-3 text-center">{item.qty}</span>
                          <button onClick={() => changeQty(item, 1)} className="w-5 h-5 bg-black/5 hover:bg-black/10 rounded text-black/40 flex items-center justify-center">
                            <Plus size={8} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer footer */}
              {cart.length > 0 && (
                <div className="px-4 py-3 border-t border-black/6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-black/40">합계</span>
                    <span className="text-sm font-black text-black font-mono">{totalPrice.toLocaleString()}원</span>
                  </div>
                  <button className="w-full py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-black/85 transition-colors">
                    주문하기
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
