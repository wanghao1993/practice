

(function () {
    require(['config'], function(config){
        config = config
        var DrawTable = function (data) {
            config = Object.assign(config, data)
            this.ID = config.ID
            this.startPosition = config.startPosition
            this.THEME = config.THEME
            this.BORDERWIDTH = config.BORDERWIDTH
            this.columnHeight = config.columnHeight
            this.columnWidth = config.columnWidth
            this.canvas = {}
            this.ctx = {}
            this.tabledata = data
            this.WIDTH = config.width || window.innerWidth
            this.HEIGHT = config.height || window.innerHeight
        }
        DrawTable.prototype.constructor = DrawTable
        DrawTable.prototype = {
            init: function () {
                this.canvas = document.getElementById(this.ID)
                this.ctx = this.canvas.getContext('2d')
                this.canvas.width = this.WIDTH
                this.canvas.height = this.HEIGHT
                this.startDrawTableHeader()
                this.startDrawTableBody()
                window.onresize = function () {
                    this.WIDTH = window.innerWidth
                    this.HEIGHT = window.innerHeight
                    this.init()
                }.bind(this, )
            },
            // 绘制表头
            startDrawTableHeader () {
                let data = config.data.headers
                const len = data.length
                const ctx = this.ctx
                const {startPosition} = config

                // 填充背景色
                // ctx.beginPath()
                // ctx.fillStyle = '#fafafa'
                // ctx.rect(this.startPosition.x, this.startPosition.y, this.columnWidth * len, this.columnHeight)
                // ctx.closePath()
                
                ctx.beginPath()
                ctx.moveTo(startPosition.x, startPosition.y)
                ctx.lineTo(startPosition.x + (len * this.columnWidth), startPosition.y)
                ctx.lineTo(startPosition.x + (len * this.columnWidth), startPosition.y + this.columnHeight)
                ctx.lineTo(startPosition.x, startPosition.y + this.columnHeight)
                ctx.font = 'bold 14px serif'
                ctx.textAlign = "center";
                // 设置垂直对齐方式
                ctx.textBaseline = "middle";
                for(let i = 0; i < len; i++) {
                    ctx.fillText(data[i].label, startPosition.x + (i * this.columnWidth) + this.columnWidth / 2, startPosition.y + this.columnHeight / 2)
                    ctx.moveTo(startPosition.x + (i * this.columnWidth), startPosition.y)
                    ctx.lineTo(startPosition.x + (i * this.columnWidth), startPosition.y + this.columnHeight)
                }
                ctx.closePath()
                ctx.stroke()

            },

            startDrawTableBody () {
                const data = config.data.tableDatas || []
                const headers = config.data.headers || []
                const { ctx } = this
                ctx.beginPath()

                // ctx.lineTo(this.startPosition.x, this.startPosition.y + (data.length + 1) * this.columnHeight)
                // ctx.lineTo(this.startPosition.x + headers.length * this.columnWidth, this.startPosition.y + (data.length + 1) * this.columnHeight)
                ctx.rect(this.startPosition.x, this.startPosition.y + this.columnHeight, headers.length * this.columnWidth, data.length * this.columnHeight)
                ctx.closePath()

                ctx.font = 'bold 14px serif'
                ctx.textAlign = "center";
                // 设置垂直对齐方式
                ctx.textBaseline = "middle";
                headers.forEach((header, h_index) => {
                    ctx.moveTo(this.startPosition.x + h_index * this.columnWidth, this.startPosition.y + data.length * this.columnHeight)
                    
                    // 绘制表格
                })
                ctx.stroke()
            }
        }

        console.log(DrawTable)
        window.DrawTable = window.DrawTable || DrawTable
    })
})(window)