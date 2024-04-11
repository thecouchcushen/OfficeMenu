import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Button
} from '@chakra-ui/react'
import { useState } from 'react';

const newIngredient = {
    ingredientDescription: '',
    ingredientQuantityPurchased: 0,
    ingredientUnit: '',
    ingredientPurchasePrice: 0,
    ingredientQuantityPerMeal: 0,
}

const PricingCalculator = () => {
    const [numberOfIngredients, setNumberOfIngredients] = useState(1)
    const [ingredients, setIngredients] = useState([newIngredient])
    const [markupPercentage, setMarkupPercentage] = useState(0)
    const [totalMealCost, setTotalMealCost] = useState(0)
    const [totalSpent, setTotalSpent] = useState(0)
    

    const increaseNumberOfIngredients = () => {
        setNumberOfIngredients(numberOfIngredients + 1)
        setIngredients([...ingredients, newIngredient])
    }

    const calculateTotalMealCost = (ingredients) => {
        return (
            ingredients.reduce(function(prev,cur) {
            return prev + cur.ingredientPurchasePrice*cur.ingredientQuantityPerMeal/cur.ingredientQuantityPurchased
        }, 0)
        )
    }

    const calculateTotalSpentOnMeal = (ingredients) => {
        return (
            ingredients.reduce(function(prev,cur) {
                return (parseInt(prev) + parseInt(cur.ingredientPurchasePrice))
            }, 0)
        )
    }

    const handleIngredientChange = (valueChanging, newValue, ingredientNumber) => {
        const nextIngredientsList = ingredients.map((ingredient, i) => {
            if (ingredientNumber !== i) {
                return (ingredient)
            } else {
                switch (valueChanging) {
                    case 'ingredientDescription':
                        return {
                            ...ingredient,
                            ingredientDescription: newValue
                        }
                    case 'ingredientQuantityPurchased':
                        return {
                            ...ingredient,
                            ingredientQuantityPurchased: newValue
                        }
                    case 'ingredientUnit':
                        return {
                            ...ingredient,
                            ingredientUnit: newValue
                        }
                    case 'ingredientPurchasePrice':
                        return {
                            ...ingredient,
                            ingredientPurchasePrice: newValue
                        }
                    case 'ingredientQuantityPerMeal':
                        return {
                            ...ingredient,
                            ingredientQuantityPerMeal: newValue
                        }
                    default:
                        break
                }
            }
        })
        setTotalSpent(calculateTotalSpentOnMeal(nextIngredientsList))
        setTotalMealCost(calculateTotalMealCost(nextIngredientsList))
        setIngredients(nextIngredientsList)
    }

    const deleteIngredient = (index) => {
        const updatedIngredients = [...ingredients]
        updatedIngredients.splice(index, 1)
        setIngredients(updatedIngredients)
        setTotalSpent(calculateTotalSpentOnMeal(updatedIngredients))
        setTotalMealCost(calculateTotalMealCost(updatedIngredients))
    }
    
    return (
        <TableContainer>
            <Table>
                <TableCaption placement='top'>Pricing Calculator</TableCaption>
                <Thead>
                    <Tr>
                        <Th colSpan={4}>Purchased</Th>
                        
                        <Th colSpan={2}>Per Meal</Th>
                        
                    </Tr>
                    <Tr>
                        <Th>Description</Th>
                        <Th>Quantity</Th>
                        <Th>Units</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                        <Th>Cost/Meal</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map((ingredient, i) => (
                        <Tr key={"Ingredient" + i}>
                            <Td><Input value={ingredient.ingredientDescription} onChange={(event) => handleIngredientChange('ingredientDescription',event.target.value,i)}></Input></Td>
                            <Td><Input value={ingredient.ingredientQuantityPurchased} onChange={(event) => handleIngredientChange('ingredientQuantityPurchased',event.target.value,i)}></Input></Td>
                            <Td><Input value={ingredient.ingredientUnit} onChange={(event) => handleIngredientChange('ingredientUnit',event.target.value,i)}></Input></Td>
                            <Td><Input value={ingredient.ingredientPurchasePrice} onChange={(event) => handleIngredientChange('ingredientPurchasePrice',event.target.value,i)}></Input></Td>
                            <Td><Input value={ingredient.ingredientQuantityPerMeal} onChange={(event) => handleIngredientChange('ingredientQuantityPerMeal',event.target.value,i)}></Input></Td>
                            <Td>{
                            
                            (ingredient.ingredientQuantityPurchased > 0 ? ingredient.ingredientPurchasePrice*ingredient.ingredientQuantityPerMeal/ingredient.ingredientQuantityPurchased : "Populate Row")
                            
                            }</Td>
                            <Td><Button onClick={() => deleteIngredient(i)}>Delete</Button></Td>
                        </Tr>
                    ))
                    }
                    
                    <Tr>
                        <Td><Button onClick={increaseNumberOfIngredients}>+</Button></Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td>Total Spent:</Td>
                        <Td>{totalSpent}</Td>
                        <Td>Total Cost/Meal:</Td>
                        <Td>{totalMealCost}</Td>
                    </Tr>
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>Markup:</Td>
                        <Td>
                            <Input value={markupPercentage} onChange={(event) => setMarkupPercentage(event.target.value)}></Input>%
                        </Td>
                        <Td>{(markupPercentage/100)*totalMealCost}</Td>
                    </Tr>
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td>Meals Sold to Break Even:</Td>
                        <Td>{totalSpent/(totalMealCost + (markupPercentage/100)*totalMealCost)}</Td>
                        <Td>Charge:</Td>
                        <Td>${totalMealCost + (markupPercentage/100)*totalMealCost}</Td>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default PricingCalculator;