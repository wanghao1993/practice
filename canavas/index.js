
(function () {
    var DrawTable = function ({ID, DATA, THEME, BORDERWIDTH, ROWHEIGHT = 30, ROWWIDTH = 130, width = 800, height = 800}) {
        this.ID = ID
        this.THEME = THEME
        this.BORDERWIDTH = BORDERWIDTH
        this.ROWHEIGHT = ROWHEIGHT
        this.ROWWIDTH = ROWWIDTH
        this.canvas = document.getElementById(this.ID)
        this.ctx = this.canvas.getContext('2d')
        this.TABLEDATA = DATA
        this.WIDTH = width
        this.HEIGHT = height
    }
    DrawTable.prototype.constructor = DrawTable
    DrawTable.prototype = {
        init: function () {
            this.canvas.width = this.WIDTH
            this.canvas.height = this.HEIGHT
            this.startDrawTableHeader()
        },

        startDrawTableHeader () {
            let data = this.TABLEDATA.headers
            const len = data.length
            const ctx = this.ctx
            console.log(100 + (len * this.ROWWIDTH))
            ctx.beginPath()
            ctx.moveTo(100, 20)
            ctx.lineTo(100 + (len * this.ROWWIDTH), 20)
            ctx.lineTo(100 + (len * this.ROWWIDTH), 20 + this.ROWHEIGHT)
            ctx.lineTo(100, 20 + this.ROWHEIGHT)
            ctx.lineTo(100, 20)

            for(let i = 0; i < len; i++) {
                ctx.moveTo(100 + (i * this.ROWWIDTH), 20)
                ctx.lineTo(100 + (i * this.ROWWIDTH), 20 + this.ROWHEIGHT)
            }
            ctx.closePath()
            ctx.stroke()
        }
    }
    window.DrawTable = window.DrawTable || DrawTable
})(window)