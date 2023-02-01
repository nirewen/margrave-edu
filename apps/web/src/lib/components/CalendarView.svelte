<script lang="ts">
    import Calendar from '$lib/components/Calendar.svelte'
    import TableRow from '$lib/components/TableRow.svelte'
    import { format } from '$lib/util'
    import { utcToZonedTime } from 'date-fns-tz'

    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const monthNames = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

    let headers: string[] = []
    let now = utcToZonedTime(new Date(), 'America/Sao_Paulo')
    let year = now.getFullYear() //	this is the month & year displayed
    let month = now.getMonth()

    type Day = {
        name: string
        enabled: boolean
        date: Date
    }
    let days: Day[] = [] //	The days to display in each box

    //	The Calendar Component just displays stuff in a row & column. It has no knowledge of dates.
    //	The items[] below are placed (by you) in a specified row & column of the calendar.
    //	You need to call findRowCol() to calc the row/col based on each items start date. Each date box has a Date() property.
    //	And, if an item overlaps rows, then you need to add a 2nd item on the subsequent row.
    type Item = {
        title: string
        subtitle?: string
        subitems?: Item[]
        className?: string
        date: Date
        len?: number
        isBottom?: boolean
        detailHeader?: string
        detailContent?: string
        startCol?: number
        startRow?: number
        hidden?: boolean
    }
    export let items: Item[]

    $: month, year, initContent()
    $: monthItems = items.filter(i => now.getMonth() === month && now.getFullYear() === year)

    // choose what date/day gets displayed in each date box.
    function initContent() {
        headers = dayNames
        initMonth()
        arrangeItems()
    }

    function initMonth() {
        days = []
        let monthAbbrev = monthNames[month].slice(0, 3)
        let nextMonthAbbrev = monthNames[(month + 1) % 12].slice(0, 3)
        //	find the last Monday of the previous month
        var firstDay = new Date(year, month, 1).getDay()
        //console.log('fd='+firstDay+' '+dayNames[firstDay]);
        var daysInThisMonth = new Date(year, month + 1, 0).getDate()
        var daysInLastMonth = new Date(year, month, 0).getDate()
        var prevMonth = month == 0 ? 11 : month - 1

        //	show the days before the start of this month (disabled) - always less than 7
        for (let i = daysInLastMonth - firstDay; i < daysInLastMonth; i++) {
            let d = new Date(prevMonth == 11 ? year - 1 : year, prevMonth, i + 1)
            days.push({ name: '' + (i + 1), enabled: false, date: d })
        }
        //	show the days in this month (enabled) - always 28 - 31
        for (let i = 0; i < daysInThisMonth; i++) {
            let d = new Date(year, month, i + 1)
            if (i == 0) days.push({ name: monthAbbrev + ' ' + (i + 1), enabled: true, date: d })
            else days.push({ name: '' + (i + 1), enabled: true, date: d })
            //console.log('i='+i+'  dt is '+d+' date() is '+d.getDate());
        }
        //	show any days to fill up the last row (disabled) - always less than 7
        for (let i = 0; days.length % 7; i++) {
            let d = new Date(month == 11 ? year + 1 : year, (month + 1) % 12, i + 1)
            if (i == 0) days.push({ name: nextMonthAbbrev + ' ' + (i + 1), enabled: false, date: d })
            else days.push({ name: '' + (i + 1), enabled: false, date: d })
        }
    }

    function arrangeItems() {
        for (let i of items) {
            let rc = findRowCol(i.date)
            if (rc == null) {
                i.startCol = i.startRow = 0
                i.hidden = true
            } else {
                i.startCol = rc.col
                i.startRow = rc.row
                i.hidden = false
            }
        }

        items = items.reduce((acc: Item[], cur: Item) => {
            if (acc.find(i => i.startCol === cur.startCol && i.startRow === cur.startRow)) {
                cur.isBottom = true
            }
            return [...acc, cur]
        }, [])
    }

    function findRowCol(dt: Date) {
        for (let i = 0; i < days.length; i++) {
            let d = days[i].date
            if (
                d.getFullYear() === dt.getFullYear() &&
                d.getMonth() === dt.getMonth() &&
                d.getDate() === dt.getDate()
            )
                return { row: Math.floor(i / 7) + 2, col: (i % 7) + 1 }
        }
        return null
    }
    function next() {
        month++
        if (month == 12) {
            year++
            month = 0
        }
    }
    function prev() {
        if (month == 0) {
            month = 11
            year--
        } else {
            month--
        }
    }
</script>

<div class="calendar-view">
    <div class="calendar-container">
        <div class="calendar-header">
            <h1>
                <button on:click={() => ((month = now.getMonth()), (year = now.getFullYear()))}>
                    <iconify-icon icon="material-symbols:today" width="2rem" />
                </button>
                <button on:click={() => year--}>
                    <iconify-icon icon="mdi:chevron-double-left" width="2rem" />
                </button>
                <button on:click={() => prev()}>
                    <iconify-icon icon="mdi:chevron-left" width="2rem" />
                </button>
                <span>
                    {monthNames[month]}
                    {year}
                </span>
                <button on:click={() => next()}>
                    <iconify-icon icon="mdi:chevron-right" width="2rem" />
                </button>
                <button on:click={() => year++}>
                    <iconify-icon icon="mdi:chevron-double-right" width="2rem" />
                </button>
            </h1>
        </div>

        <Calendar {headers} {days} {items} />
    </div>
    <div class="sidebar">
        {#if monthItems}
            {#each monthItems as item}
                <TableRow columns="auto 1fr auto" shadow={false}>
                    <span>{item.title}</span>
                    <span class="description">{item.subtitle}</span>
                    <span>{format(item.date.toISOString())}</span>
                    <div style:grid-column="span 3">
                        {#if item.subitems}
                            {#each item.subitems as subitem}
                                <TableRow columns="auto 1fr auto" shadow={false}>
                                    <span>{subitem.title}</span>
                                    <span class="description">{subitem.subtitle}</span>
                                    <span>{format(subitem.date.toISOString())}</span>
                                </TableRow>
                            {/each}
                        {/if}
                    </div>
                </TableRow>
            {:else}
                <span>Nenhuma aula para esse mês</span>
            {/each}
        {/if}
    </div>
</div>

<style lang="scss">
    .calendar-view {
        display: grid;
        grid-template-columns: auto 24rem;
        gap: 1rem;

        .sidebar {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            padding: 1rem;
            background-color: var(--gray-900);
            box-shadow: var(--elevation-6);
            border-radius: 0.5rem;
        }

        .calendar-container {
            width: 100%;
            overflow: hidden;
            box-shadow: var(--elevation-6);
            border-radius: 0.5rem;
            background: #fff;
            max-width: 1200px;

            .calendar-header {
                text-align: center;
                padding: 20px 0;
                background: #eef;
                border-bottom: 1px solid rgba(166, 168, 179, 0.12);

                h1 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    margin: 0;
                    font-size: 1.4rem;
                    font-weight: 600;
                    font-family: var(--font-mono);

                    span {
                        padding: 0 0.4rem;
                    }
                }
                button {
                    display: grid;
                    place-content: center;
                    background: #ddf;
                    border: 1px;
                    padding: 0.4rem 0.6rem;
                    color: rgba(81, 86, 93, 0.7);
                    cursor: pointer;
                    outline: 0;
                }
            }
        }
    }

    span.description {
        opacity: 60%;
    }

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
