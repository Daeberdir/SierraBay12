/obj/item/dice
	name = "dice"
	desc = "A base for dices. You should not see this. Yell at coder."
	icon = 'icons/obj/dice.dmi'
	icon_state = "holder"
	w_class = ITEM_SIZE_TINY
	attack_verb = list("diced")

	/// The number of the sides of the die. Not just the limits of the potential `result` (see `roll_die()`).
	var/sides = 0
	/// Last rolling result. Needed for normal icon updating.
	var/result = 0


/obj/item/dice/Initialize()
	. = ..()

	if(!result)
		roll_die()
		return

	desc = initial(desc) + SPAN_NOTICE("<br>Current result: [result].")
	update_icon()


/obj/item/dice/on_update_icon()
	. = ..()

	icon_state = "[initial(icon_state)]-[result]"


/obj/item/dice/attack_self(mob/user)
	var/comment = roll_die(user)

	user.visible_message(SPAN_NOTICE("[user] has thrown [src]. It lands on [result]. [comment]"), \
						 SPAN_NOTICE("You throw [src]. It lands on a [result]. [comment]"), \
						 SPAN_NOTICE("You hear [src] landing on a [result]. [comment]"))


/obj/item/dice/throw_impact(atom/hit_atom, datum/thrownthing/TT)
	..()
	var/comment = roll_die(TT.thrower)

	if(!TT.thrower)
		return	//	Less spam when moving with explosions, etc.

	visible_message(SPAN_NOTICE("\The [src] lands on [result]. [comment]"))


/// Gives a random result and changing `icon_state` and `desc` after it. Also returns a comment about result.
/obj/item/dice/proc/roll_die(mob/thrower)
	SHOULD_CALL_PARENT(TRUE)

	result = manipulate_result(rand(1, sides))
	desc = initial(desc) + SPAN_NOTICE("<br>Current result: [result].")
	update_icon()


/// For use in dice that have unusual side names.
/obj/item/dice/proc/manipulate_result(original)
	return original


/obj/item/dice/d4
	name = "d4"
	desc = "A dice with four sides."
	icon_state = "d4"
	sides = 4


/obj/item/dice/d6
	name = "d6"
	desc = "A dice with six sides."
	icon_state = "d6"
	sides = 6


/obj/item/dice/d8
	name = "d8"
	desc = "A dice with eight sides."
	icon_state = "d8"
	sides = 8


/obj/item/dice/d10
	name = "d10"
	desc = "A dice with ten sides."
	icon_state = "d10"
	sides = 10


/obj/item/dice/d12
	name = "d12"
	desc = "A dice with twelve sides."
	icon_state = "d12"
	sides = 12


/obj/item/dice/d20
	name = "d20"
	desc = "A dice with twenty sides."
	icon_state = "d20"
	sides = 20


/obj/item/dice/d20/roll_die(mob/thrower)
	. = ..()

	if(result == 20)
		. = "Nat 20!"

	else if(result == 1)
		. = "Ouch, bad luck."


/obj/item/dice/d20/cursed
	desc = "A dice with twenty sides said to have an ill effect on those that are unlucky..."


/obj/item/dice/d20/cursed/roll_die(mob/thrower)
	. = ..()

	if(!isliving(thrower))
		return

	var/mob/living/thrower_living = thrower

	if(result == 20)
		thrower_living.adjustBruteLoss(-30)

	else if(result == 1)
		thrower_living.adjustBruteLoss(30)


/obj/item/dice/d00
	name = "d00"
	desc = "A dice with ten sides. This one is for the tens digit."
	icon_state = "d00"
	sides = 10


/obj/item/dice/d00/manipulate_result(original)
	return (original - 1) * 10	// 0, 10, 20 ... 90. It's works best with `d10`.

