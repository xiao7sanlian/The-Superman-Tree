addLayer("qi", {
    name: "QqQeInfinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Qi", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        supermanPower:n(0),
    }},
    color: "#aee308",
    requires() {let a=new Decimal(10)
        if(hasMilestone('q',2)) a=a.div(tmp.q.superEff)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "QqQeInfinity", // Name of prestige currency
    baseResource: "Superman Crystal", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff){player.devSpeed = player.pause
        if(hasMilestone('qi',0))player.qi.supermanPower = player.qi.supermanPower.add(tmp.qi.SPgain.times(diff))
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for QqQeInfinity", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    autoPrestige(){let a= player.qi.qiAuto&&hasMilestone('q',0)
        return a
    },
    tabFormat: {
    "Main": {
        content: [ "main-display","prestige-button","resource-display","clickables","milestones","upgrades",["display-text", () => tmp.qi.SPtext],
    ],
    unlocked(){return true},
    },
    },
    doReset(resettingLayer) {
            let kept = []
            kept.push('upgrades','milestones')
        if (resettingLayer == 'q') {//qqqe308
            layerDataReset(this.layer, kept)
    }
    },
    upgrades:{
        11: {title(){let a='Start Pack'
            return a
        },
        description(){let a='Double Superman Crystal gain.'
            return a
        },
        cost:n(0),
        },
        12: {title(){let a='QqQe308 Matter'
            return a
        },
        description(){let a='Unlock QqQe308 Matter.'
            return a
        },
        unlocked(){return hasUpgrade('qi',11)},
        cost:n(100),
        currencyLocation() {return player.qi},
        currencyDisplayName: 'Superman Power',
        currencyInternalName: 'supermanPower',
        },
        13: {title(){let a='cokecole'
            return a
        },
        description(){let a='Unlock cokecole.<br>This is the current Endgame.'
            return a
        },
        unlocked(){return hasUpgrade('q',14)},
        cost:n(1e9),
        currencyLocation() {return player.qi},
        currencyDisplayName: 'Superman Power',
        currencyInternalName: 'supermanPower',
        },
    },
    clickables:{
        11: {
            title() {let a="Pause"
                return a
            },
            display() {let a="Click to Pause, Click Again to Resume"
                return a
            },
            canClick() {return true},
            onClick() {player.pause = n(1).sub(player.pause)
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 QqQeInfinity",
            effectDescription() {let a="Generates Superman Power based on your QqQeInfinity.<br>Currently: "+format(tmp.qi.SPgain)+'/s Base: '+format(tmp.qi.SPbase)+'<br>All upgrades and milestones in this layer are permanent.'
                return a
            },
            done() { return player.qi.points.gte(1) }
        },
        1: {
            requirementDescription: "5 QqQeInfinity",
            effectDescription() {let a="Double Super-QqQe308 generation speed."
                return a
            },
            done() { return player.qi.points.gte(5)&&hasMilestone('q',2) },
            unlocked(){return hasMilestone('qi',0)&&hasMilestone('q',2)},
        },
    },
    SPgain(){let a=tmp.qi.SPbase.pow(player.qi.points.sub(1))
        //q layer
        if(player.q.points.gt(0)) a=a.times(tmp.q.effect)
        if(hasUpgrade('q',12)) a=a.times(upgradeEffect('q',12))
        if(player.qi.points.eq(0)) a=n(0)
        return a
    },
    SPbase(){let a=n(1.5)
                if(hasMilestone('q',3)) a=a.add(milestoneEffect('q',3))
                return a
    },
    SPtext(){let a="You have <h3 style='color: #aee308; text-shadow: 0 0 3px #c2b280'>"+format(player.qi.supermanPower)+"</h3> Superman Power, multiplying Superman Crystal gain by "+format(tmp.qi.SPeff)+'.'
        if(hasMilestone('q',1)) a=a+'<br>You can only make '+formatWhole(tmp.qi.maxSuper)+' kind(s) of Super-man at once.'
        return a
    },
    SPeff(){let a=player.qi.supermanPower.add(1).pow(0.5)
        return a
    },
    maxSuper(){let a=n(1)
        return a
    },
    currentSuper(){let a=n(0)
        if(getClickableState('q',11)==1) a=a.add(1)
        return a
    },
})

addLayer("q", {
    name: "QqQe308", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        super:n(0),
    }},
    color: "#eee308",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "QqQe308 Matter", // Name of prestige currency
    baseResource: "Superman Power", // Name of resource prestige is based on
    baseAmount() {return player.qi.supermanPower}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if(hasUpgrade('q',14)) mult=mult.times(upgradeEffect('q',14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff){if(getClickableState(this.layer,11)==1) player.q.super = player.q.super.add(tmp.q.superSpeed.times(diff))
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for QqQe308 Matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches:['qi'],
    layerShown(){return true},
    tabFormat: {
    "Main": {
        content: [ "main-display","prestige-button","resource-display","milestones",'buyables','upgrades',["display-text", () => tmp.q.SQqtext],'clickables',
    ],
    unlocked(){return hasUpgrade('qi',12)},
    },
    },
    upgrades:{
        11: {title(){let a='QqQe308'
            return a
        },
        description(){let a='The effect of QqQe308 Matter also affects Superman Crystal gain.'
            return a
        },
        effect(){a=tmp.q.effect
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
        unlocked(){return hasMilestone('q',4)},
        cost:n(0),
        currencyLocation() {return player.q},
        currencyDisplayName: 'Super-QqQe308',
        currencyInternalName: 'super',
        },
        12: {title(){let a='is'
            return a
        },
        description(){let a='The effect of QqQe308 affects Superman Power gain at a reduced rate.'
            return a
        },
        effect(){a=buyableEffect('q',11).log(2).pow(1.5).add(1)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
        unlocked(){return hasUpgrade('q',11)},
        cost:n(179),
        currencyLocation() {return player.q},
        currencyDisplayName: 'Super-QqQe308',
        currencyInternalName: 'super',
        },
        13: {title(){let a='a'
            return a
        },
        description(){let a='QqQeInfinity amount boosts Super-QqQe308 generation speed.'
            return a
        },
        effect(){a=n(1.15).pow(player.qi.points)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
        unlocked(){return hasUpgrade('q',12)},
        cost:n(308),
        currencyLocation() {return player.q},
        currencyDisplayName: 'Super-QqQe308',
        currencyInternalName: 'super',
        },
        14: {title(){let a='catgirl!'
            return a
        },
        description(){let a='Super-QqQe308 boosts QqQe308 Matter gain.<br>Unlock a new QqQeInfinity Upgrade.'
            return a
        },
        effect(){a=player.q.super.add(1).pow(0.33)
                    return a
            },
            effectDisplay(){return format(this.effect())+'x'},
        unlocked(){return hasUpgrade('q',13)},
        cost:n(2085),
        currencyLocation() {return player.q},
        currencyDisplayName: 'Super-QqQe308',
        currencyInternalName: 'super',
        },
    },
    clickables:{
        11: {
            title(){ a="Make Super-QqQe308"
                if(getClickableState(this.layer, this.id)==1) a='Stop making Super-QqQe308'
                return a
            },
            display() {a= "You are currently"
                if(getClickableState(this.layer, this.id)==0) a=a+' NOT'
                a=a+" making Super-QqQe308"
            return a},
            unlocked() {return hasMilestone('q', 2)},
            canClick() {return hasMilestone('q', 2)&&(tmp.qi.currentSuper.lt(tmp.qi.maxSuper)||getClickableState(this.layer, this.id)==1)},
            onClick() {setClickableState(this.layer, this.id, 1-getClickableState(this.layer, this.id))},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 QqQe308 Matter",
            effectDescription() {let a="Unlock QqQeInfinity autobuyer."
                return a
            },
            done() { return player.q.points.gte(1) },
            toggles:[["qi", "qiAuto"]],
        },
        1: {
            requirementDescription: "5 QqQe308 Matter",
            effectDescription() {let a="Unlock QqQe308."
                return a
            },
            done() { return player.q.points.gte(5) },
            unlocked(){return hasMilestone('q',0)}
        },
        2: {
            requirementDescription: "25 QqQe308 Matter",
            effectDescription() {let a="Unlock Super-QqQe308."
                return a
            },
            done() { return player.q.points.gte(25) },
            unlocked(){return hasMilestone('q',1)}
        },
        3: {
            requirementDescription: "125 QqQe308 Matter",
            effectDescription() {let a="QqQe308 Matter adds QqQeInfinity base.<br>Currently: +"+format(this.effect())
                return a
            },
            effect(){let a=player.q.points.add(1).log(2).sub(1).max(0).pow(0.5).sub(1)
                return a
            },
            done() { return player.q.points.gte(125) },
            unlocked(){return hasMilestone('q',2)}
        },
        4: {
            requirementDescription: "625 QqQe308 Matter",
            effectDescription() {let a="Unlock Super-QqQe308 Upgrades."
                return a
            },
            done() { return player.q.points.gte(625) },
            unlocked(){return hasMilestone('q',3)}
        },
    },
    buyables: {
        11: {
            title(){text = 'QqQe308'
                text=text+'('+format(getBuyableAmount(this.layer, this.id),0)
                text=text+')'
                return text
            },
            cost(x) { a= new Decimal(10).pow(x)
                    return a
             },
             base(){let a=n(2)
                return a
             },
            effect(x) {return this.base().pow(x)},
            display() {let a='Multiply Superman Crystal gain by '+format(this.base())+'<sup>'+format(getBuyableAmount(this.layer, this.id),0)+'</sup>='+format(this.effect())
                a=a+'<br>Cost: '+format(this.cost())+' QqQe308 Matter'
            return a },
            unlocked() {return hasMilestone('q',1)},
            canAfford() { return player.q.points.gte(this.cost()) },
            buy() {
                player.q.points = player.q.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
					if (!this.canAfford()) return;
					let target = tempBuy.plus(1).log(10).add(1).max(0).floor();
					player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
			},
        },
    },
    effect(){let a=player.q.points.add(2).log(2).pow(2)
        return a
    },
    effectDescription(){let a='multiplying Superman Power gain by '+format(tmp.q.effect)
        return a
    },
    SQqtext(){let a = "You have made <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>" + format(player.q.super) + "</h3> Super-QqQe308"
        a=a+", dividing the requirement of QqQeInfinity by "+format(tmp.q.superEff)
        a=a+".<br/>Based your Superman Power，your QqQeInfinity makes "+ format(tmp.q.superSpeed) +" Super-QqQe308 per second."
        if(!hasMilestone('q',2)) a=''
        return a
    },
    superEff(){let a=player.q.super.floor().add(1).pow(2)
        return a
    },
    superSpeed(){let a=player.qi.supermanPower.add(1).pow(0.25).div(60)
        if(hasMilestone('qi',1)) a=a.times(2)
        if(hasUpgrade('q',13)) a=a.times(upgradeEffect('q',13))
        return a
    },
})

addLayer("a", {
    name: "Achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#f2ff00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "achievements", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    update(diff){player.a.points = n(player.a.achievements.length)},
    tabFormat: [
    "main-display",
    "achievements"
    ],
    achievements: {
    11: {
        name: "To Begin With",
        tooltip(){let a='Get your first QqQeInfinity!'
            return a
        },
        done(){return player.qi.points.gte(1)},
        textStyle: {'color': '#ffe125'},
    },
    12: {
        name: "A New Layer!",
        tooltip(){let a='Unlock QqQe308 Matter.<br>Reward: Gain 2x Superman Crystal.'
            return a
        },
        done(){return hasUpgrade('qi',12)},
        textStyle: {'color': '#4bd123'},
    },
    13: {
        name: "Super Start",
        tooltip(){let a='Make a Super-QqQe308.'
            return a
        },
        done(){return player.q.super.gte(1)},
        textStyle: {'color': '#ffe125'},
    },
    14: {
        name: "So Fast",
        tooltip(){let a='Make Super-QqQe308 generation speed greater than 1/s.'
            return a
        },
        done(){return tmp.q.superSpeed.gte(1)},
        textStyle: {'color': '#ffe125'},
    },
    },
    effect(){let a=n(1.03).pow(player.a.points)
        return a
    },
    effectDescription(){let a='multiplying Superman Crystal gain by '+format(tmp.a.effect)
        return a
    },
})