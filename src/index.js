/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */

export class World {
    constructor() {
        this.powerPlants = new Set()
        this.households = new Set()
        this.connections = new Map()
        this.alivePowerPlants = new Set()
    }

    createPowerPlant() {
        const powerPlant = {id: this.powerPlants.size, isAlive: true} // 1. powerPlant must be active
        this.powerPlants.add(powerPlant)
        this.alivePowerPlants.add(powerPlant)
        return powerPlant
    }

    createHousehold() {
        const household = {id: this.households.size}
        this.households.add(household)
        this.connections.set(household, new Set()) // 2. household can share energy with other householders
        return household
    }

    connectHouseholdToPowerPlant(household, powerPlant) {
        const connections = this.connections.get(household)
        connections.add(powerPlant)
    }

    connectHouseholdToHousehold(household1, household2) {
        const connections1 = this.connections.get(household1) // householder1 -> to connections2
        const connections2 = this.connections.get(household2) // householder2 -> to connections1
        connections1.add(household2)
        connections2.add(household1)
    }

    disconnectHouseholdFromPowerPlant(household, powerPlant) {
        const connections = this.connections.get(household)
        connections.delete(powerPlant)
    }

    killPowerPlant(powerPlant) {
        powerPlant.isAlive = false // disable powerPlant but save it for future
        this.alivePowerPlants.delete(powerPlant)
    }

    repairPowerPlant(powerPlant) {
        powerPlant.isAlive = true // restore powerPlant
        this.alivePowerPlants.add(powerPlant)
    }

    //some mistake in an electricity : )
    householdHasEletricity(household, visited = new Set()) {
        const connections = this.connections.get(household)

        // if connection undefined or empty
        if (!connections || connections.size === 0) {
            return false
        }
        for (const connection of connections) {
            // primary logic for check activity
            if (connection.isAlive) {
                return true
            }
            if (!visited.has(connection)) {
                // if connection have another connection
                visited.add(connection)
                // call another method
                if (this.householdHasEletricity(connection, visited)) {
                    return true
                }
            }
        }
        return false
    }
}






