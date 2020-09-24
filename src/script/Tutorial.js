/*************************************************************************
                        Tutorialmod für MCPE
                            TimoTheBuilder
*************************************************************************/

//declaring item attributes
var rainbow = {
    id: 1260,
    name: "Rainbow Ingot",
    texture: "rainbow_ingot",
    max_stack: 64,
    category: ItemCategory.MATERIAL
}
var sword = {
    id: 1261,
    name: "Rainbow Sword",
    texture: "rainbow_sword",
    type: EnchantType.weapon,
    value: 5,
    damage: 10
}
var pickaxe = {
    id: 1262,
    name: "Rainbow Pickaxe",
    texture: "rainbow_pickaxe",
    type: EnchantType.pickaxe,
    value: 5
}
var hoe = {
    id: 1263,
    name: "Rainbow Hoe",
    texture: "rainbow_hoe",
    type: EnchantType.hoe,
    value: 5
}
var shovel = {
    id: 1264,
    name: "Rainbow Shovel",
    texture: "rainbow_shovel",
    type: EnchantType.shovel,
    value: 5
}
var axe = {
    id: 1265,
    name: "Rainbow Axe",
    texture: "rainbow_axe",
    type: EnchantType.axe,
    value: 5
}
var staff = {
    id: 1266,
    name: "Rainbow Staff",
    texture: "rainbow_staff",
    type: EnchantType.weapon,
    value: 5,
    damage: 5
}
var potion = {
    id: 1267,
    name: "Rainbow Potion",
    texture: "rainbow_potion",
}

//implementing functions for items
function newItem(v){
    ModPE.setItem(v.id, v.texture, 0, v.name, v.max_stack);
    Player.addItemCreativeInv(v.id, 1, 0);
    Item.setCategory(v.id, v.category);
}

function newTool(v){
    ModPE.setItem(v.id, v.texture, 0, v.name, 1);
    Player.addItemCreativeInv(v.id, 1, 0);
    Item.setCategory(v.id, ItemCategory.TOOL);
    Item.setHandEquipped(v.id, true);
    Item.setEnchantType(v.id, v.type, v.value);
}

function newThrowable(v){
    Item.defineThrowable(v.id, v.texture, 0, v.name);
    Player.addItemCreativeInv(v.id, 1, 0);
    Item.setCategory(v.id, ItemCategory.TOOL);
}
//main implementing
newItem(rainbow);
newTool(sword);
newTool(pickaxe);
newTool(hoe);
newTool(shovel);
newTool(axe);
newTool(staff);
newThrowable(potion);

//game hook
function newLevel(){
    clientMessage("§5W§de§1l§9c§3o§bm§2e §at§eo §6R§ca§4i§5n§db§1o§9w §3M§bo§2d");
    clientMessage("Thanks for playing!");
}

function attackHook(attacker, victim){
    if(Player.getCarriedItem() == sword.id && attacker == Player.getEntity()){
        Entity.setHealth(victim, Entity.getHealth(victim) - sword.damage);
        Entity.addEffect(victim, MobEffect.wither, 900, 0, false, true);
    }
    else if(Player.getCarriedItem() == staff.id){
        Entity.setHealth(victim, Entity.getHealth(victim) - staff.damage);
        Level.spawnMob(Entity.getX(victim), Entity.getY(victim)-1, Entity.getZ(victim), EntityType.LIGHTNING_BOLT);
    }
}

function useItem(x, y, z, itemid, blockid){
    if(blockid == 2 && itemid == hoe.id){
        setTile(x, y, z, 60);
    }
    else if(blockid == 2 && itemid == shovel.id){
        setTile(x, y, z, 198);
    }
    else if(itemid == staff.id){
        Level.spawnMob(x, y, z, EntityType.LIGHTNING_BOLT);
        setTile(x,y,z, 51, 0);
    }
}

function destroyBlock(x, y, z, side){
    var tile = getTile(x, y, z);
    if(Player.getCarriedItem() == 1265){
        if(tile == 17){
            Level.destroyBlock(x, y, z, true);
            for(var i = y+1; i < 128; i++){
                if(getTile(x, i, z) == 17){
                    Level.destroyBlock(x, i, z, true);
                }else{
                    break;
                }
            }
        }else{
            Level.destroyBlock(x, i, z, true);
        }
    }
}

function procCmd(txt){
    if(txt == "coords"){
        clientMessage("X: " + Player.getX());
        clientMessage("Y: " + Player.getY());
        clientMessage("Z: " + Player.getZ());
    }
}

function customThrowableHitBlockHook(projectile, itemid, x, y, z){
    if(itemid == potion.id){
        Level.explode(x, y, z, 10, true);
        Level.addParticle(ParticleType.hugeexplosion, x, y, z, x, y, z, 10);
    }
}